import React from 'react';
import { cn } from '../utils/tw';

interface StartEngineButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isSpinning?: boolean;
}

export const StartEngineButton: React.FC<StartEngineButtonProps> = ({ onClick, disabled, isSpinning }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "group relative w-64 h-64 rounded-[9999px] flex items-center justify-center transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                !disabled && "hover:scale-105 active:scale-95"
            )}
        >
            {/* Outer Chrome Ring */}
            <div className="absolute inset-0 rounded-[9999px] bg-linear-to-br from-gray-300 via-gray-600 to-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.5)] border-gray-500/30">
                {/* Glossy highlight on chrome */}
                <div className="absolute inset-1 rounded-[9999px] bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-50"></div>
            </div>

            {/* Recessed Middle Ring */}
            <div className="absolute inset-4 rounded-[9999px] bg-surface-container shadow-[inset_0_10px_20px_rgba(0,0,0,1),0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center">

                {/* Glowing Blue Circle */}
                <div className={cn(
                    "absolute inset-2 rounded-[9999px] transition-all duration-500 border-2",
                    isSpinning
                        ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8),inset_0_0_15px_rgba(239,68,68,0.6)]"
                        : "border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6),inset_0_0_10px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.9),inset_0_0_20px_rgba(34,211,238,0.7)]"
                )}></div>

                {/* Center Button Surface */}
                <div className="absolute inset-8 rounded-[9999px] bg-linear-to-b from-surface-bright to-surface-container-lowest shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-center">
                    <span className="font-headline font-bold text-on-surface-variant text-[12px] tracking-[0.4em] uppercase mb-1 drop-shadow-sm">Engine</span>
                    <span className={cn(
                        "font-headline font-black text-2xl tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
                        isSpinning ? "text-error" : "text-white"
                    )}>
                        {isSpinning ? 'STOP' : 'START'}
                    </span>
                    <span className="font-headline font-bold text-on-surface-variant text-[13px] tracking-[0.4em] uppercase mt-1 drop-shadow-sm">Spin</span>
                </div>
            </div>

            {/* Button Glint/Reflection */}
            <div className="absolute top-[15%] left-[20%] w-[30%] h-[15%] bg-white/5 rounded-[100%] blur-md -rotate-45 pointer-events-none"></div>
        </button>
    );
};
