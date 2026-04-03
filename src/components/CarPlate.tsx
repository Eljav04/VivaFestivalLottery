import React from 'react';
import { cn } from '../utils/tw';

interface CarPlateProps {
    plate: string;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

export const CarPlate: React.FC<CarPlateProps> = ({ plate, size = 'md', active }) => {
    const sizeClasses = {
        sm: 'text-lg px-2 py-1',
        md: 'text-2xl px-3 py-1.5',
        lg: 'text-3xl px-4 py-2'
        // lg: 'text-5xl md:text-6xl px-6 py-4 border-r-8',
    };

    return (
        <div className='border border-white rounded-xl'>
            <div
                className={cn(
                    'bg-white rounded-[8px] flex items-center gap-4 px-4 py-2 font-headline text-black relative border-[3px] border-black shadow-lg',
                    active && 'ring-4 ring-cyan-400/50 plate-shadow',
                    sizeClasses[size]
                )}
            >
                <div className="flex flex-col items-center justify-center gap-1">
                    <img
                        src="/az_flag.png"
                        alt="AZ"
                        className={cn(
                            "object-contain",
                            size === 'sm' ? 'w-4' : size === 'md' ? 'w-6' : 'w-8'
                        )}
                    />
                    <span className={cn(
                        "font-bold text-black font-headline leading-none",
                        size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-[12px]' : 'text-[14px]'
                    )}>AZ</span>
                </div>
                <span className={cn(
                    "font-black tracking-tight flex-1 text-center whitespace-nowrap",
                    size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl'
                )}>
                    {plate}
                </span>
            </div>
        </div>
    );
};
