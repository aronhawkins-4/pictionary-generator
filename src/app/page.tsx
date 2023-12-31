'use client';

import { useState } from 'react';
import { GeneratorForm } from './components/GeneratorForm';
import { Timer } from './components/Timer';
import { Footer } from './components/Footer';

export default function Home() {
	const [currentWord, setCurrentWord] = useState<string>();
	const [isBlurred, setIsBlurred] = useState(false);

	return (
		<main className='flex flex-col min-h-screen gap-8 items-center justify-center relative bg-gray-950'>
			<div className='flex flex-col grow md:flex-row items-start justify-between gap-16 w-full max-w-5xl mx-auto px-8 pb-16 pt-36 lg:pb-24 lg:pt-56 lg:px-24'>
				<div className='flex flex-col gap-8 w-full'>
					<div className='w-full'>
						<GeneratorForm
							setCurrentWord={setCurrentWord}
							setIsBlurred={setIsBlurred}
						/>
					</div>
					<div className='flex flex-col gap-4 w-full'>
						<h2 className='text-2xl'>Your word is:</h2>

						<div className='flex gap-2 flex-col'>
							<div className='flex items-center p-2.5  border-b rounded-none focus:ring-blue-500 focus:border-blue-500  w-full  border-gray-600 placeholder-gray-400 text-white min-h-[54px]'>
								{currentWord && <h2 className={`text-2xl ${isBlurred && ' blur-md'} transition-all `}>{currentWord}</h2>}
							</div>
							{currentWord && (
								<button
									className='w-min text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 min-w-[6rem]'
									onClick={() => setIsBlurred((current) => !current)}
								>
									{!isBlurred && 'Blur'} {isBlurred && 'Reveal'}
								</button>
							)}
						</div>
					</div>
				</div>
				<div className='w-full flex justify-center'>
					<Timer />
				</div>
			</div>
			<Footer />
		</main>
	);
}
