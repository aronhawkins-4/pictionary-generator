import Link from 'next/link';
import { AiFillGithub, AiOutlineLink } from 'react-icons/ai';

export const Footer = () => {
	return (
		<div className='w-full p-4 gap-4 flex flex-col sm:flex-row justify-between bg-gray-950 border-t border-gray-800'>
			<div className='w-full '>
				<p className='text-sm text-center sm:text-left'>© 2023 Aron Hawkins. All rights reserved.</p>
			</div>
			<div className='flex justify-center sm:justify-end items-center gap-4'>
				<Link
					href='https://github.com/aronhawkins-4'
					target='_blank'
				>
					<AiFillGithub size={24} />
				</Link>
				<Link
					href='https://www.aronhawkins.com'
					target='_blank'
				>
					<AiOutlineLink size={24} />
				</Link>
			</div>
		</div>
	);
};
