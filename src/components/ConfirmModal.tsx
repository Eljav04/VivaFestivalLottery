import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-surface-container-highest border border-outline/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 carbon-pattern opacity-5 -mr-16 -mt-16 rotate-45 pointer-events-none"></div>
                        
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-outline/40 hover:text-white transition-colors p-1"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6 border border-error/20">
                                <AlertTriangle className="text-error" size={32} />
                            </div>

                            <h3 className="text-2xl font-headline font-black tracking-tighter uppercase mb-2 text-white">
                                {title}
                            </h3>
                            
                            <p className="font-body text-on-surface-variant text-sm mb-8 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex w-full gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-outline/10 text-outline uppercase font-headline font-black text-xs tracking-widest hover:bg-outline/20 transition-all rounded-sm"
                                >
                                    XEYR
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="flex-1 py-3 px-4 bg-error text-on-error uppercase font-headline font-black text-xs tracking-widest hover:brightness-110 shadow-lg shadow-error/20 active:scale-95 transition-all rounded-sm"
                                >
                                    BƏLİ, SİL
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
