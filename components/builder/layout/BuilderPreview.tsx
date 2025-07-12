'use client'

import EachFormStepContainer from "@/components/builder/EachFormStepContainer";
import EachFormGroup from "@/components/builder/EachFormGroup";
import React from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePreview } from '@/hooks/usePreview';
import AddFormStep from "@/components/AddFormStep";


export default function BuilderPreview() {
    const { steps, formGroupIDs, elements, fields, appendToPreview } = usePreview();
    const [dragOver, setDragOver] = React.useState<{stepId: string, index: number} | null>(null);

    function handleDropStep(e: React.DragEvent, stepId: string, insertIndex: number) {
        e.preventDefault();
        setDragOver(null);
        let data: any = null;
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            data = { type: 'image', kind: 'element', fromPanel: true, file };
        } else {
            const dataStr = e.dataTransfer.getData('application/json');
            if (dataStr) {
                try {
                    data = JSON.parse(dataStr);
                } catch {}
            }
        }
        if (data) {
            appendToPreview({ ...data, stepId, index: insertIndex });
        }
    }

    function handleDragOverStep(e: React.DragEvent, stepId: string, insertIndex: number) {
        e.preventDefault();
        setDragOver({ stepId, index: insertIndex });
    }

    function handleDragLeaveStep(e: React.DragEvent) {
        setDragOver(null);
    }

    return (
        <div className={'xl:w-[90%] 2xl:w-[900px] flex flex-col pt-10 pb-20'}>
            {steps
                .slice()
                .sort((a, b) => a.index - b.index)
                .map((step) => {
                    const items = formGroupIDs
                        .filter(item => item.formStep === step.id)
                        .slice()
                        .sort((a, b) => a.index - b.index);
                    return (
                        <div key={step.id} className="rounded-lg min-h-[80px]- flex flex-col">
                            <EachFormStepContainer data={step}>
                                <DropZone
                                    isActive={dragOver?.stepId === step.id && dragOver.index === 0}
                                    onDrop={e => handleDropStep(e, step.id, 0)}
                                    onDragOver={e => handleDragOverStep(e, step.id, 0)}
                                    onDragLeave={handleDragLeaveStep}
                                />
                                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                                    <div className="bg-card rounded-lg flex flex-col gap-6 py-4 border">
                                        {items.map((groupData, idx) => {
                                            const targetData = groupData.type === 'element'
                                                ? elements.find(el => el.id === groupData.targetID)
                                                : fields.find(field => field.id === groupData.targetID);
                                            if (!targetData) return null;
                                            return (
                                                <React.Fragment key={groupData.id}>
                                                    <EachFormGroup groupData={groupData} targetData={targetData} />
                                                    <DropZone
                                                        isActive={dragOver?.stepId === step.id && dragOver.index === idx + 1}
                                                        onDrop={e => handleDropStep(e, step.id, idx + 1)}
                                                        onDragOver={e => handleDragOverStep(e, step.id, idx + 1)}
                                                        onDragLeave={handleDragLeaveStep}
                                                    />
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </SortableContext>
                            </EachFormStepContainer>
                            <AddFormStep />
                        </div>
                    );
                })}
        </div>
    );
}

function DropZone({ isActive, onDrop, onDragOver, onDragLeave }: {
    isActive: boolean;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
}) {
    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            style={{
                minHeight: '16px',
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: isActive ? '2px dashed #6366f1' : '2px dashed transparent',
                margin: '4px 0',
                borderRadius: '6px',
                transition: 'background 0.15s, border 0.15s',
            }}
        />
    );
}
