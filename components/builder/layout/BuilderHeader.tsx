import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import { HiBars3BottomLeft, HiOutlineSun, HiPencil } from "react-icons/hi2";

import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";

export default function BuilderHeader() {
    const { undo, redo, canRedo, canUndo } = usePreview();
    const onPreview = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <header className={'h-12 min-h-12 border-b w-full z-40 flex items-center justify-between px-2 sticky top-0 bg-gradient-to-b from-card via-card to-muted/10'}>
            <div className={'flex gap-2 items-center'}>
                <Button size={'sm'} variant={'ghost'}>
                    <HiBars3BottomLeft />
                </Button>
                <div className={'flex gap-1 items-center group transition-all duration-300'}>
                    <span className={'group-hover:underline'}>The name of the form</span>
                    <button className={'invisible group-hover:visible text-muted-foreground'}>
                        <HiPencil />
                    </button>
                </div>
            </div>
            <div className={'flex gap-2 items-center'}>
                <Button size={'sm'} variant={'outline'} onClick={undo} disabled={!canUndo} aria-label="Undo">
                    <HiArrowUturnLeft />
                </Button>
                <Button size={'sm'} variant={'outline'} onClick={redo} disabled={!canRedo} aria-label="Redo">
                    <HiArrowUturnRight />
                </Button>
                <Button size={'sm'} variant={'outline'}>
                    <HiOutlineSun />
                </Button>
                <Button size={'sm'} onClick={onPreview}>Preview</Button>
            </div>
        </header>
    );
}
