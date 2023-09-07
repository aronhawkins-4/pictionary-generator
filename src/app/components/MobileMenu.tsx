'use client';

import { useState } from 'react';
import { UploadModal } from './UploadModal';
import { RulesModal } from './RulesModal';

export const MobileMenu = () => {
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
	return (
		<div className='absolute top-[125%] right-0 z-20 p-4 flex flex-col justify-center items-center bg-gray-900 border-2 border-gray-700 rounded-lg shadow-sm'>
			<div className='relative w-full max-w-md max-h-full'>
				<div className='flex flex-col gap-4'>
					<button onClick={() => setIsRulesModalOpen(true)}>Rules</button>
					<button
						data-modal-target='authentication-modal'
						data-modal-toggle='authentication-modal'
						className='block text-white bg-blue-700  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-centerbg-blue-600 hover:bg-blue-700 focus:ring-blue-800 w-max md:ml-auto'
						type='button'
						onClick={() => setIsUploadModalOpen(true)}
					>
						Upload your own word
					</button>
					{isUploadModalOpen && <UploadModal setIsOpen={setIsUploadModalOpen} />}
					{isRulesModalOpen && <RulesModal setIsOpen={setIsRulesModalOpen} />}
				</div>
			</div>
		</div>
	);
};
