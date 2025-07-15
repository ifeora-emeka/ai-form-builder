import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { HiMiniSparkles } from 'react-icons/hi2'

export default function AIChat() {
    const [open, setOpen] = useState(true);
    const [hasResponse, setHasResponse] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    return (
        <>
            <div
                className={cn('min-h-14 w-14 z-[60] fixed left-1/2 border bg-sidebar -translate-x-1/2 bottom-4 transition-all duration-300 flex items-center shadow-lg rounded-full overflow-hidden', {
                    "w-[500px]": open,
                    "rounded-lg gap-4 flex-col": hasResponse
                })}
            >
                <div className='flex'>
                    <div
                        onClick={() => setOpen(!open)}
                        className="h-14 min-w-14 flex items-center justify-center text-2xl rounded-full z-50 text-primary cursor-pointer transition-colors duration-300"
                    >
                        <HiMiniSparkles />
                    </div>
                    {
                        open && hasResponse && <div className={cn('min-h-52 transition-all duration-300 flex-1 overflow-y-auto flex flex-col gap-2 py-2')}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis quidem dolor nemo culpa repellat neque non inventore, delectus quasi doloremque dolores dolore iure. Animi, natus voluptatum quam numquam aut dicta.
                    </div>
                    }
                </div>
                <input
                    ref={inputRef}
                    autoFocus={open}
                    className={cn('w-[80%] outline-none border-none', { 'hidden absolute': !open, "mb-4": hasResponse })}
                    placeholder='What can I help you with?'
                />
            </div>
        </>
    )
}
