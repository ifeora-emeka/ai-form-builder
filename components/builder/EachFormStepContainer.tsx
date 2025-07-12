import {Button} from "@/components/ui/button";
import {HiOutlineEye, HiOutlineTrash, HiBars3, HiPencil} from "react-icons/hi2";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {FormStep} from "@/types/builder.types";

export default function EachFormStepContainer({
    children,
    data
}: {
    children: React.ReactNode;
    data: FormStep
}) {
    return (
        <div className={'flex flex-col gap-2 rounded-lg'}>
            <div className={'flex items-center gap-2 pt-2 min-h-9'}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Drag step">
                                <HiBars3/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Drag</TooltipContent>
                    </Tooltip>
                    <span className="font-semibold text-lg flex-1 select-none ml-1">
                        {data.name || 'Untitled Step'}
                    </span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Show/hide step">
                                <HiOutlineEye/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Show/Hide</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} aria-label="Delete step">
                                <HiOutlineTrash/>
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
