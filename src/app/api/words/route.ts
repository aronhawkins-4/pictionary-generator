import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection, getDocsFromServer } from 'firebase/firestore';
import { database } from '@/app/lib/firebase/config';
import { PictionaryWord } from '@/app/types/types';

export async function POST(request: Request) {
	try {
		const dbInstance = collection(database, 'words');
		const existingWords = await getDocsFromServer(dbInstance);
		const body = await request.json();
		const { word, difficulty } = body;
		const lowerWord = word.toLowerCase();
		if (!dbInstance) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		if (!lowerWord || typeof lowerWord !== 'string' || !difficulty) {
			return new NextResponse('Invalid data', { status: 401 });
		}
		if (
			existingWords.docs.filter((doc: any) => {
				return doc._document.data.value.mapValue.fields.word.stringValue === lowerWord;
			}).length !== 0
		) {
			return NextResponse.json([]);
		}

		const newWord = await addDoc(dbInstance, {
			word: lowerWord,
			difficulty: difficulty,
		});
		return NextResponse.json(newWord);
	} catch (error: any) {
		console.log('ERROR_WORDS_POST', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const dbInstance = collection(database, 'words');
		const searchParams = request.nextUrl.searchParams;
		const difficulty = searchParams.get('difficulty');
		const data = await getDocsFromServer(dbInstance);
		let words = data.docs.map((doc: any) => {
			const word: PictionaryWord = {
				word: doc._document.data.value.mapValue.fields.word.stringValue,
				difficulty: doc._document.data.value.mapValue.fields.difficulty.mapValue.fields.value.integerValue,
			};
			return word;
		});
		if (difficulty !== '5') {
			const filteredWords = words.filter((word) => {
				return word.difficulty.toString() === difficulty;
			});

			return NextResponse.json(filteredWords);
		}

		return NextResponse.json(words);
	} catch (error: any) {
		console.log('ERROR_WORDS_GET', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
