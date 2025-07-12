import { HiMiniPlus } from "react-icons/hi2";
import { Button } from "./ui/button";

export default function AddFormStep() {
    return <div className="h-16 relative flex items-center justify-center group">
        <hr className='w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <Button size='sm' variant={'outline'} className="absolute self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <HiMiniPlus />
            <span className="text-sm">Add New Section</span>
        </Button>
    </div>
}
