import { HiMiniPlus } from "react-icons/hi2";
import { usePreview } from "@/hooks/usePreview";

export default function AddFormStep({ topFormStep }: { topFormStep?: number }) {
    const { addFormStep } = usePreview();
    return (
        <div className="py-8 relative flex items-center justify-center group">
            <hr className='w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <button
                type="button"
                className="z-40 flex items-center gap-2 px-2 py-1 border rounded-lg absolute self-center bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted-foreground hover:text-foreground"
                onClick={() => addFormStep(topFormStep)}
            >
                <HiMiniPlus />
                <small className="text-sm">Add Section Here</small>
            </button>
        </div>
    );
}
