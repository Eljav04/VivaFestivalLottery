import React from 'react';
import { cn } from '../utils/tw';

interface CarPlateProps {
    plate: string;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

export const CarPlate: React.FC<CarPlateProps> = ({ plate, size = 'md', active }) => {
    const sizeClasses = {
        sm: 'text-lg px-2 py-1 w-[140px]',
        md: 'text-3xl px-4 py-2 w-[240px]',
        lg: 'text-5xl md:text-6xl px-6 py-4 border-r-8 w-[380px]',
    };

    const flagSizeClasses = {
        sm: 'w-2 h-1',
        md: 'w-4 h-2',
        lg: 'w-6 h-3',
    };

    const containerSizeClasses = {
        sm: 'w-4 h-5',
        md: 'w-6 h-8',
        lg: 'w-8 h-10',
    };

    return (
        <div
            className={cn(
                'bg-white rounded-sm flex items-center justify-center gap-3 font-label text-black',
                size !== 'lg' && 'border-r-4',
                active ? 'border-error ring-4 ring-tertiary/20 plate-shadow' : 'border-error-dim',
                sizeClasses[size]
            )}
        >
            <div className={cn('flex flex-col items-center justify-center border border-gray-200', size === 'lg' ? 'pr-4 border-r' : '', containerSizeClasses[size])}>
                <div className="flex flex-col gap-px">
                    <div className={cn('bg-blue-700', flagSizeClasses[size])}></div>
                    <div className={cn('bg-red-600', flagSizeClasses[size])}></div>
                    <div className={cn('bg-green-600', flagSizeClasses[size])}></div>
                </div>
                {size === 'lg' && <span className="text-[10px] font-bold text-black font-label mt-1">AZ</span>}
            </div>
            <span className={cn('font-black tracking-tight')}>{plate}</span>
        </div>
    );
};
