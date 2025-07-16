import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { HiMiniSparkles } from 'react-icons/hi2'
import { GiBroom } from 'react-icons/gi';

import { Typewriter } from 'react-simple-typewriter';
import { Sparkle } from 'lucide-react';

export default function AIChat() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [focused, setFocused] = useState(false);

    const handleSubmit = () => {
        if (inputRef.current && inputRef.current?.value.trim().length < 5) return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            inputRef.current!.value = '';
            setResponse(`lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
            inputRef.current?.focus();
        }, 2000);
        inputRef.current?.focus();
    }

    const endTask = () => {
        setResponse('');
        setFocused(!focused);
        inputRef.current!.value = '';
        inputRef.current?.focus();
    }

    return <>
        <div className='fixed bottom-4 xl:w-[640px] w-full 2xl:w-[700px] max-w-[1000px] z-50 flex justify-center items-center'>
            <div
                className={cn('border-2 rounded-full flex bg-sidebar w-[95%] items-center overflow-hidden shadow-xl', {
                    "border-primary": focused,
                    "rounded-xl": response,
                    "gap-2": !response
                })}
            >
                <div className='flex flex-col justify-between items-stretch gap-2 h-full self-stretch'>
                    <div className='relative'>
                        <div
                            className="h-14 min-w-14 flex items-center justify-center text-2xl rounded-full z-50 text-primary cursor-pointer"
                        >
                            <HiMiniSparkles
                                className={cn(`transition-all duration-500`, {
                                    "h-0 w-0": loading,
                                    "h-6 w-6": !loading
                                })}
                            />
                        </div>
                        <div className='h-14 w-14 absolute translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 flex items-center justify-center'>
                            <img
                                src={'https://cdn.dribbble.com/userupload/23934109/file/original-6abc5ca0baf8cb785d4098a1e71901f8.gif'}
                                alt='AI Avatar'
                                className={cn('rounded-full transition-all duration-300 object-cover ', {
                                    "h-10 w-10": loading,
                                    "h-0 w-0": !loading
                                })}
                            />
                        </div>
                    </div>
                    {
                        response && <button
                            onClick={endTask}
                            id='clear-chat'
                            className={cn('flex items-center justify-center text-2xl rounded-full z-50 text-muted-foreground cursor-pointer transition-colors duration-300 hover:bg-accent', {
                                "h-14 min-w-14": response.length > 0
                            })}
                        >
                            <GiBroom className='h-6 w-6' />
                        </button>
                    }
                </div>
                <div className='flex-1 flex flex-col gap-4'>
                    {response && <div
                        className={cn('p-2 flex flex-col gap-0 transition-all duration-300', {
                            "gap-4": loading
                        })}
                    >
                        <p>
                            <Typewriter
                                words={[response]}
                                loop={1}
                                cursor
                                cursorStyle='|'
                                typeSpeed={2}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </p>
                        <div className={cn('text-muted-foreground flex items-center gap-2', {
                            "text-md": loading && response,
                            "text-[0px]": !loading && response
                        })}>
                            <HiMiniSparkles /> <small><i>Thinking...</i></small>
                        </div>
                    </div>}
                    <textarea
                        disabled={loading}
                        ref={inputRef}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        rows={1}
                        className={cn('border-none outline-none h-full ring-0 w-[95%] resize-none', {
                            "pb-4": response
                        })}
                        placeholder='What can I help you with?'
                    />
                </div>
            </div>

        </div>
    </>


}
