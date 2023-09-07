'use client';

import { useEffect, useState } from 'react';
import { PictionaryWord, WordDifficulty } from '../types/types';
import toast from 'react-hot-toast';
import Select from 'react-select';
import axios from 'axios';

interface GeneratorFormProps {
	setCurrentWord: (newWord: string) => void;
	setIsBlurred: (value: boolean) => void;
}

const options = [
	{ value: WordDifficulty.Any, label: 'Any' },
	{ value: WordDifficulty.Easy, label: 'Easy' },
	{ value: WordDifficulty.Medium, label: 'Medium' },
	{ value: WordDifficulty.Hard, label: 'Hard' },
	{ value: WordDifficulty.Expert, label: 'Expert' },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ setCurrentWord, setIsBlurred }) => {
	const [wordList, setWordList] = useState<PictionaryWord[]>([]);
	const [numWordsGenerated, setNumWordsGenerated] = useState(0);
	const [wordsUsed, setWordsUsed] = useState<PictionaryWord[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [difficulty, setDifficulty] = useState<WordDifficulty>();

	const changeDifficulty = (newDifficulty: WordDifficulty) => {
		filterWordsByDifficulty(newDifficulty);
		setNumWordsGenerated(0);
		setWordsUsed([]);
		setCurrentWord('');
		setDifficulty(newDifficulty);
	};
	const generateRandomNumber = () => {
		const randomNumber = Math.floor(Math.random() * wordList?.length);
		return randomNumber;
	};
	const generateWord = () => {
		setIsBlurred(false);
		if (!difficulty) {
			toast.error('Select a difficulty');
		} else {
			if (numWordsGenerated === wordList?.length) {
				setNumWordsGenerated(0);
				setWordsUsed([]);
				toast('All words used');
			} else {
				toast.dismiss();
				while (true) {
					const number = generateRandomNumber();
					const nextWord = wordList?.at(number);

					if (nextWord && !wordsUsed.includes(nextWord)) {
						setWordsUsed((current) => {
							return [...current, nextWord];
						});
						setNumWordsGenerated((current) => current + 1);
						setCurrentWord(nextWord.word);
						break;
					}
				}
			}
		}
	};

	const filterWordsByDifficulty = (difficulty: WordDifficulty) => {
		setIsLoading(true);
		axios
			.get(`/api/words?difficulty=${difficulty}`)
			.then((res) => {
				const newWords: PictionaryWord[] = res.data;
				setWordList(newWords);
				setIsLoading(false);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (wordList.length === 0) {
			toast.error('There are no words in this difficulty');
		}
		async function getWordsOnLoad() {
			axios.get('/api/words');
		}
		getWordsOnLoad();
	}, [wordList]);

	return (
		<div className='flex flex-col items-center justify-center w-full'>
			<div className='flex flex-col gap-2 w-full'>
				<div className='text-lg'>Difficulty</div>
				<Select
					onChange={(newValue) => {
						if (newValue) {
							changeDifficulty(newValue.value);
						}
					}}
					options={options}
					styles={{
						option: (styles, { isSelected }) => {
							return {
								...styles,
								color: '#000000',
								backgroundColor: isSelected ? '#EFEFEF' : '#FFF',
							};
						},
						menu: (styles) => {
							return {
								...styles,
							};
						},
					}}
					id='long-value-select'
					instanceId='long-value-select'
				/>
				<button
					type='button'
					className={`w-full text-white bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-centerbg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ${
						isLoading && 'opacity-50'
					}`}
					onClick={generateWord}
					disabled={isLoading}
				>
					Generate Word
				</button>
			</div>
		</div>
	);
};
