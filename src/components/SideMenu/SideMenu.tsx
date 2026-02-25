import React, {useState, useEffect, useRef} from 'react';
import {Menu, X} from 'lucide-react';

interface SideMenuProps {
    wordLength: number;
    setWordLength: (length: number) => void;
    theme: 'light' | 'dark';
}

export const SideMenu: React.FC<SideMenuProps> = ({ wordLength, setWordLength, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const lengths = [4, 5, 6];

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 z-50 p-2 rounded-full transition-colors duration-200"
                style={{
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                ref={menuRef}
                className={`fixed top-0 left-0 h-full w-64 z-[60] shadow-2xl transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{
                    backgroundColor: theme === 'dark' ? '#1c1d23' : '#ffffff',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <button onClick={() => setIsOpen(false)} className="p-1">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70">
                                Word Length
                            </p>
                            <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                                {lengths.map((len) => (
                                    <button
                                        key={len}
                                        onClick={() => {
                                            setWordLength(len);
                                            setIsOpen(false);
                                        }}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                            wordLength === len
                                                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                        }`}
                                    >
                                        {len === 4 ? 'Four' : len === 5 ? 'Five' : 'Six'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-8 left-6 right-6 opacity-40 text-xs italic">
                    Wordly v1.0.0
                </div>
            </div>
        </>
    );
};
