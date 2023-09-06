export interface PictionaryWord {
	word: string;
	difficulty: WordDifficulty;
}

export enum WordDifficulty {
	Easy = 1,
	Medium,
	Hard,
	Expert,
	Any,
}
