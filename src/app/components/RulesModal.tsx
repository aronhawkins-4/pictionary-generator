interface rulesModalProps {
	setIsOpen: (value: boolean) => void;
}

export const RulesModal: React.FC<rulesModalProps> = ({ setIsOpen }) => {
	return (
		<div
			id='authentication-modal'
			tab-index='-1'
			className='fixed top-0 left-0 right-0 z-50 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 flex justify-center items-center bg-black/50'
		>
			<div className='relative w-full max-w-md max-h-full'>
				<div className='relative  rounded-lg shadow bg-gray-700'>
					<button
						type='button'
						className='absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white'
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
						<h2 className='text-2xl mb-4 border-b border-gray-200'>Pictionary Rules</h2>
						<p>
							One person on your team is designated to be the first person to draw a picture of whatever random Pictionary word is generated. Once they see the word, they have 5 seconds
							to think before they begin to draw. Once they begin drawing, they have 60 seconds to try to get their team to guess the random word. If the team succeeds in guessing the
							correct word being drawn, the team gets a point, but they get zero points if they don&apos;t. Team two does the same thing, then the person drawing is switched for round
							two. After a designated number of rounds, the team with the most points wins.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
