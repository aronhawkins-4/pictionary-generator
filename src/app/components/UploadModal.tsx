'use client';

import Select from 'react-select';
import { WordDifficulty } from '../types/types';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface uploadModalProps {
	setIsOpen: (value: boolean) => void;
}

const options = [
	{ value: WordDifficulty.Easy, label: 'Easy' },
	{ value: WordDifficulty.Medium, label: 'Medium' },
	{ value: WordDifficulty.Hard, label: 'Hard' },
	{ value: WordDifficulty.Expert, label: 'Expert' },
];

export const UploadModal: React.FC<uploadModalProps> = ({ setIsOpen }) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data: any) => {
		await axios
			.post('/api/words', data)
			.then((res) => {
				if (res.data.length === 0) {
					toast.error('That word already exists');
				} else {
					toast.success('Word successfully uploaded');
					setIsOpen(false);
					router.refresh();
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	return (
		<div
			id='authentication-modal'
			tab-index='-1'
			className='fixed top-0 left-0 right-0 z-50 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 flex justify-center items-center bg-black/50'
		>
			<div className='relative w-full max-w-md max-h-full'>
				<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
					<button
						type='button'
						className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
						data-modal-hide='authentication-modal'
						onClick={() => setIsOpen(false)}
					>
						<svg
							className='w-3 h-3'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
							/>
						</svg>
						<span className='sr-only'>Close modal</span>
					</button>
					<div className='px-6 py-6 lg:px-8'>
						<h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Upload new word</h3>
						<form
							className='space-y-6'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<label
									htmlFor='word'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Word
								</label>
								<input
									type='text'
									id='word'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									placeholder='superhero'
									spellCheck
									required
									{...register('word')}
								/>
							</div>
							<div>
								<label
									htmlFor='difficulty'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Difficulty
								</label>
								<Controller
									control={control}
									name='difficulty'
									render={({ field: { onChange, onBlur, value, name, ref }, formState }) => (
										<Select
											options={options}
											required
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
											id='difficulty'
											instanceId='long-value-select-2'
											onBlur={onBlur} // notify when input is touched
											onChange={onChange} // send value to hook form
										/>
									)}
								/>
							</div>

							<button
								type='submit'
								className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
