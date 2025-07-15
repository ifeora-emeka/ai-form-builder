

import { Button } from "@/components/ui/button";
import { HiOutlineEye, HiOutlineTrash, HiBars3, HiOutlineEyeSlash, HiChevronUp, HiChevronDown } from "react-icons/hi2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FormStep } from "@/types/builder.types";
import { useEffect, useRef, useState } from "react";
import AutowidthInput from "react-autowidth-input";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";


type EachFormStepContainerProps = {
    updateFormStep: (id: string, data: Partial<FormStep>) => void;
    onDelete?: (stepId: string) => void;
    isHidden?: boolean;
    children: React.ReactNode;
    data: FormStep;
};

export default function EachFormStepContainer({
    children,
    data,
    updateFormStep,
    onDelete,
    isHidden = false
}: EachFormStepContainerProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formStepName, setFormStepName] = useState(data.name || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const [collapsed, setCollapsed] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormStepName(e.target.value);
    }

    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        if (formStepName.trim() === '') {
            setFormStepName(data.name || 'Untitled Step');
            return;
        }
        if (formStepName !== data.name) {
            updateFormStep(data.id, { name: formStepName });
        }
    }

    useEffect(() => {
        setFormStepName(data.name || 'Untitled Step');
    }, [data.name]);

    const handleDelete = () => {
        if (onDelete) onDelete(data.id);
        setShowDeleteDialog(false);
    };

    const handleHide = () => {
        updateFormStep(data.id, { hidden: !data.hidden });
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={cn('flex flex-col rounded-lg', {
                'opacity-40': isHidden
            })}
        >
            <div className={'flex items-center gap-2 min-h-9'}>
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
                            <Button size={'icon'} variant={'ghost'} aria-label={data.hidden ? "Show step" : "Hide step"} onClick={handleHide}>
                                {
                                    data.hidden ? <HiOutlineEye /> : <HiOutlineEyeSlash />
                                }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{data.hidden ? "Show step" : "Hide step"}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <Button size={'icon'} variant={'ghost'} aria-label="Delete step" onClick={() => setShowDeleteDialog(true)}>
                                    <HiOutlineTrash />
                                </Button>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Step?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this step? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TooltipProvider>
            </div>
            <div className={cn("flex-1 transition-all duration-300", { "max-h-0 overflow-hidden": collapsed })}>
                {children}
            </div>
        </div>
    );
}
