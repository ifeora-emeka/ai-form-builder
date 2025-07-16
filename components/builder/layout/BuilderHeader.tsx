import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import { HiBars3BottomLeft, HiOutlineArrowPath, HiPencil } from "react-icons/hi2";
import { useTheme } from "next-themes"
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react";

export default function BuilderHeader() {
    const { setTheme, theme } = useTheme()
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size={'sm'} variant={'outline'} onClick={onPreview} aria-label="Redo">
                    <HiOutlineArrowPath />
                </Button>
                <Button size={'sm'}>Preview</Button>
            </div>
        </header>
    );
}
