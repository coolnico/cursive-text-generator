import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 2000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-top-5 duration-300 font-medium text-sm">
            <span className="bg-green-500 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold">✓</span>
            {message}
        </div>
    );
};

export default Toast;
