'use client';

import { useState } from 'react';
import { UploadModal } from './UploadModal';
import { RulesModal } from './RulesModal';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return (
		<div className='absolute top-0 left-0 w-full min-h-[4rem] flex flex-row justify-between items-center border-b border-gray-800 py-2 gap-4 px-4 md:px-8 justify-items-center bg-gray-950 z-50'>
			<div>
				<div className='hidden md:block min-w-[190px]'></div>
			</div>
			<div className='grow'>
				<h1 className='text-2xl sm:text-3xl text-left md:text-center'>Pictionary Generator</h1>
			</div>
			<div className='sm:flex gap-8 hidden'>
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
			<div className='block sm:hidden relative cursor-pointer'>
				<HiOutlineBars3
					size={32}
					onClick={() => setIsMobileMenuOpen((current) => !current)}
				/>
				{isMobileMenuOpen && <MobileMenu />}
			</div>
		</div>
	);
};
