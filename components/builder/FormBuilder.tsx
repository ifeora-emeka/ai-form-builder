import BuilderHeader from "@/components/builder/layout/BuilderHeader";
import BuilderLeftPanel from "@/components/builder/layout/BuilderLeftPanel";
import BuilderPreview from "@/components/builder/layout/BuilderPreview";

export default function FormBuilder() {
    return <div className={'bg-background min-h-screen flex'}>
        <BuilderLeftPanel/>
        <main className={'flex-1 h-screen flex flex-col items-center overflow-y-auto'}>
            <BuilderHeader/>

            <BuilderPreview/>

        </main>
        <aside className={'w-[300px] h-screen bg-card border-l'}></aside>
    </div>
}
