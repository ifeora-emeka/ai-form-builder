import { Button } from "@/components/ui/button";
import { HiOutlineEye, HiOutlineTrash, HiBars3 } from "react-icons/hi2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FormStep } from "@/types/builder.types";
import { useEffect, useRef, useState } from "react";
import AutowidthInput from "react-autowidth-input";

export default function EachFormStepContainer({
    children,
    data
}: {
    children: React.ReactNode;
    data: FormStep
}) {
    const [formStepName, setFormStepName] = useState(data.name || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormStepName(e.target.value);
    }

    const handleBlur = () => {
        if(formStepName.trim() === '') return setFormStepName(data.name || 'Untitled Step');
    }


    useEffect(() => {
        setFormStepName(data.name || 'Untitled Step');
    }, [data.name]);

    return (
        <div className={'flex flex-col rounded-lg'}>
            <div className={'flex items-center gap-2 pt-2 min-h-9'}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Drag step">
                                <HiBars3 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Drag</TooltipContent>
                    </Tooltip>
                    <div className="flex-1 flex items-center gap-2 justify-start">
                        <AutowidthInput
                            className="font-semibold text-lg select-none p-0 outline-none border-b focus:border-primary border-background cursor-default focus:cursor-text"
                            value={formStepName}
                            onChange={handleNameChange}
                            autoFocus
                            ref={inputRef}
                            onFocus={() => inputRef.current?.select()}
                            onBlur={handleBlur}
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Show/hide step">
                                <HiOutlineEye />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Show/Hide</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Delete step">
                                <HiOutlineTrash />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {children}
        </div>
    );
}
