'use client';

import { useState } from 'react';
import { UploadModal } from './UploadModal';
import { RulesModal } from './RulesModal';

export const Header = () => {
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
	return (
		<div className='w-full min-h-[4rem] flex flex-col sm:flex-row justify-between items-center border-b border-gray-800 py-2 gap-4 px-4 md:px-8 justify-items-center bg-gray-950'>
			<div>
				<div className='hidden md:block min-w-[190px]'></div>
			</div>
			<div className='grow'>
				<h1 className='text-2xl sm:text-3xl text-left md:text-center'>Pictionary Generator</h1>
			</div>
			<div className='flex gap-8'>
				<button onClick={() => setIsRulesModalOpen(true)}>Rules</button>
				<button
					data-modal-target='authentication-modal'
					data-modal-toggle='authentication-modal'
					className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-max md:ml-auto'
					type='button'
					onClick={() => setIsUploadModalOpen(true)}
				>
					Upload your own word
				</button>
				{isUploadModalOpen && <UploadModal setIsOpen={setIsUploadModalOpen} />}
				{isRulesModalOpen && <RulesModal setIsOpen={setIsRulesModalOpen} />}
			</div>
		</div>
	);
};
