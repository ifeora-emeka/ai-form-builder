
import { Button } from "@/components/ui/button";
import { HiOutlineEye, HiOutlineTrash, HiBars3, HiOutlineEyeSlash, HiChevronUp, HiChevronDown } from "react-icons/hi2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FormStep } from "@/types/builder.types";
import { useEffect, useRef, useState } from "react";
import AutowidthInput from "react-autowidth-input";
import { usePreview } from '@/hooks/usePreview';
import { cn } from "@/lib/utils";


export default function EachFormStepContainer({
    children,
    data
}: {
    children: React.ReactNode;
    data: FormStep
}) {
    const [formStepName, setFormStepName] = useState(data.name || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const [collapsed, setCollapsed] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormStepName(e.target.value);
    }

    const { updateFormStep } = usePreview();
    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        if (formStepName.trim() === '') {
            setFormStepName(data.name || 'Untitled Step');
            return;
        }
        if (formStepName !== data.name) {
            updateFormStep({ name: formStepName }, data.id);
        }
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
                            <Button size={'icon'} variant={'ghost'} aria-label={collapsed ? "Expand step" : "Collapse step"} onClick={() => setCollapsed(!collapsed)}>
                                {collapsed ? <HiChevronUp /> : <HiChevronDown />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{collapsed ? "Expand step" : "Collapse step"}</TooltipContent>
                    </Tooltip>
                    <div className="flex-1 flex items-center gap-2 justify-start">
                        <AutowidthInput
                            className={cn("font-semibold text-lg select-none p-0 outline-none border-b focus:border-primary border-background cursor-default focus:cursor-text", { 'opacity-40 line-through': data.hidden })}
                            value={formStepName}
                            onChange={handleNameChange}
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleBlur();
                                }
                            }}
                            onFocus={() => inputRef.current?.select()}
                            onBlur={handleBlur}
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label={collapsed ? "Expand step" : "Collapse step"} onClick={() => updateFormStep({ hidden: !data.hidden }, data.id)}>
                                {
                                    data.hidden ? <HiOutlineEye /> : <HiOutlineEyeSlash />
                                }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{collapsed ? "Expand step" : "Collapse step"}</TooltipContent>
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
            <div className={cn("flex-1 transition-all duration-300", { "max-h-0 overflow-hidden": collapsed })}>
                {children}
            </div>
        </div>
    );
}
