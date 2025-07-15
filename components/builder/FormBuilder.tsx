'use client';
import BuilderHeader from "@/components/builder/layout/BuilderHeader";
import BuilderLeftPanel from "@/components/builder/layout/BuilderLeftPanel";
import BuilderPreview from "@/components/builder/layout/BuilderPreview";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { usePreview } from '@/hooks/usePreview';
import React from 'react';
import BuilderRightPanel from "./layout/BuilderRightPanel";
import { ScrollArea } from "../ui/scroll-area";

export default function FormBuilder() {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const {
        steps,
        formGroups,
        elements,
        fields,
        appendFormGroupToPreview,
        setActiveFormGroup,
        activeFormGroup,
        updateFormGroup,
        updateFormStep,
        deleteFormGroup,
        deleteFormStep,
        moveFormGroupItem,
        reorderFormGroupItem,
        updateFormField
    } = usePreview();

    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        setReady(true);
    }, []);

    React.useEffect(() => {
        function handleBuilderAppend(e: any) {
            const { type, stepId, kind, file } = e.detail;
            appendFormGroupToPreview({ type, stepId, kind, file });
        }
        window.addEventListener('builder-append', handleBuilderAppend);
        return () => window.removeEventListener('builder-append', handleBuilderAppend);
    }, [appendFormGroupToPreview]);

    if (!ready) return null;

    function handleDragEnd(event: any) {
        const { active, over, data } = event;
        if (!over || !active) return;
        if (active.data?.current?.fromPanel) {
            const { type, kind, file } = active.data.current;
            const stepId = over.data?.current?.stepId || formGroups.find(i => i.id === over.id)?.formStep || steps[0]?.id;
            appendFormGroupToPreview({ type, stepId, kind, file });
            return;
        }
        const activeId = active.id as string;
        const overId = over.id as string;
        const activeItem = formGroups.find(i => i.id === activeId);
        const overItem = formGroups.find(i => i.id === overId);
        if (!activeItem || !overItem) return;
        if (activeItem.formStep === overItem.formStep) {
            if (activeItem.index !== overItem.index) {
                reorderFormGroupItem(activeItem.formStep, activeItem.index, overItem.index);
            }
        } else {
            moveFormGroupItem(activeItem.formStep, overItem.formStep, activeItem.index, overItem.index);
        }
    }

    function handleDragOver(event: any) { }

    function handleDrop(event: React.DragEvent) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            appendFormGroupToPreview({ type: 'image', stepId: steps[0]?.id, kind: 'element', file });
        }
    }

    return <div className={'bg-background min-h-screen flex'}>
        <BuilderLeftPanel />
        <div className={'flex-1 h-screen flex flex-col items-center bg-background'}>
            <BuilderHeader />
            <ScrollArea className="h-[calc(100vh-3rem)] overflow-y-auto w-full">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                    <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="w-full h-full flex-1 flex flex-col items-center">
                        <BuilderPreview
                            updateFormField={updateFormField}
                            steps={steps}
                            formGroups={formGroups}
                            elements={elements}
                            fields={fields}
                            appendFormGroupToPreview={(data) => {
                                appendFormGroupToPreview({
                                    ...data,
                                    type: data.type as any,
                                    kind: data.kind as 'element' | 'field',
                                });
                            }}
                            setActiveFormGroup={setActiveFormGroup}
                            activeFormGroup={activeFormGroup}
                            updateFormGroup={updateFormGroup}
                            deleteFormGroup={deleteFormGroup}
                            updateFormStep={updateFormStep}
                            deleteFormStep={deleteFormStep}
                            moveFormGroupItem={(fromIndex, toIndex) => {
                                moveFormGroupItem('', '', fromIndex, toIndex);
                            }}
                            reorderFormGroupItem={(fromIndex, toIndex) => {
                                reorderFormGroupItem('', fromIndex, toIndex);
                            }}
                         />
                    </div>
                </DndContext>
            </ScrollArea>
        </div>
        <BuilderRightPanel />
    </div>
}
