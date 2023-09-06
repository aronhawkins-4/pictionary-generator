'use client';
import { use, useCallback, useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { GrPowerReset } from 'react-icons/gr';
import { AiOutlineMinus, AiOutlinePlus, AiOutlinePause } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';

export const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [key, setKey] = useState(0);
	const [startTime, setStartTime] = useState(30);
	const [timeLeft, setTimeLeft] = useState(0);

	const renderTime = ({ remainingTime }: { remainingTime: number }) => {
		if (remainingTime === 0) {
			return (
				<div
					className='text-white cursor-pointer'
					onClick={() => {
						setKey((prevKey) => prevKey + 1);
						setIsPlaying(false);
					}}
				>
					<GrPowerReset
						size={48}
						className='reset-icon'
					/>
					<span className='sr-only'>Reset timer</span>
				</div>
			);
		}
		return (
			<div className='timer'>
				<div className='value text-xl'>{remainingTime}</div>
			</div>
		);
	};
	return (
		<div className='flex flex-col gap-8 items-center'>
			<div className='relative mx-auto border-gray-800 :border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl'>
				<div className='w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute'></div>
				<div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg'></div>
				<div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg'></div>
				<div className='h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg'></div>
				<div className='rounded-[2rem] overflow-hidden w-[272px] h-[572px] flex flex-col gap-8 items-center justify-between bg-gray-950 pt-16'>
					<CountdownCircleTimer
						isPlaying={isPlaying}
						duration={startTime}
						colors={['#16a34a', '#facc15', '#dc2626', '#dc2626']}
						colorsTime={[7, 5, 2, 0]}
						key={key}
						onUpdate={(remainingTime) => {
							setTimeLeft(remainingTime);
						}}
						onComplete={() => {
							setIsPlaying(false);
						}}
					>
						{renderTime}
					</CountdownCircleTimer>
					<div>
						<div className='text-lg text-center mb-1'>Time (s)</div>
						<div className='flex items-center border text-sm rounded-lg w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 appearance-none text-center overflow-hidden'>
							<div
								className='flex justify-center items-center p-2 text-white hover:bg-gray-800/50'
								onClick={() => {
									setStartTime((current) => {
										if (current !== 1) {
											return current - 1;
										}
										return 1;
									});
									setKey((current) => current + 1);
								}}
							>
								<AiOutlineMinus size={32} />
							</div>
							<div className=''>
								<input
									type='text'
									inputMode='numeric'
									id='default-input'
									className='border-x text-sm rounded-none block w-16 p-2.5 bg-gray-700 border-gray-600 :placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 appearance-none text-center'
									onChange={(event) => {
										setStartTime(Number(event.target.value));
									}}
									value={startTime}
								/>
							</div>
							<div
								className='flex justify-center items-center p-2 text-white hover:bg-gray-800/50'
								onClick={() => {
									setStartTime((current) => {
										return current + 1;
									});
									setKey((current) => current + 1);
								}}
							>
								<AiOutlinePlus size={32} />
							</div>
						</div>
					</div>

					<div
						className='inline-flex rounded-none shadow-sm w-full border-t border-b bg-gray-700 border-gray-600 text-white'
						role='group'
					>
						<button
							type='button'
							className='w-full flex justify-center items-center px-4 py-2 focus:z-10 focus:ring-2 bg-gray-800 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white border-r border-gray-600'
							onClick={() => {
								if (timeLeft !== 0) {
									setIsPlaying((current) => {
										return !current;
									});
								} else {
									setKey((prevKey) => prevKey + 1);
									setIsPlaying(false);
								}
							}}
						>
							{!isPlaying && <BsFillPlayFill size={32} />}
							{isPlaying && <AiOutlinePause size={32} />}
						</button>
						<button
							className=' w-full flex justify-center items-center px-4 py-2 focus:z-10 focus:ring-2  text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white'
							onClick={() => {
								setKey((prevKey) => prevKey + 1);
								setIsPlaying(false);
							}}
						>
							<GrPowerReset
								size={24}
								className='reset-icon'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
