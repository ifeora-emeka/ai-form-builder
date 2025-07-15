import { HiMiniPlus } from "react-icons/hi2";

export default function AddFormStep() {
    return <div className="py-8 relative flex items-center justify-center group">
        <hr className='w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <button className="flex items-center gap-2 px-2 border rounded-lg absolute self-center bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted-foreground hover:text-foreground">
            <HiMiniPlus />
            <small className="text-sm">Add Section Here</small>
        </button>
    </div>
}
