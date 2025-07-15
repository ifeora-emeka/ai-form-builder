'use client'

import EachFormStepContainer from "@/components/builder/EachFormStepContainer";
import EachFormGroup from "@/components/builder/EachFormGroup";
import React from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePreview } from '@/hooks/usePreview';
import AddFormStep from "@/components/AddFormStep";
import { FormElement, FormField, FormGroupItem, FormStep } from "@/types/builder.types";


export default function BuilderPreview(
    {
        steps,
        formGroups,
        elements,
        fields,
        appendFormGroupToPreview,
        setActiveFormGroup,
        activeFormGroup,
        updateFormGroup,
        deleteFormGroup,
        updateFormStep,
        deleteFormStep,
        moveFormGroupItem,
        reorderFormGroupItem
    }:{
        steps: FormStep[];
        formGroups: FormGroupItem[];
        elements: FormElement[];
        fields: FormField[];
        appendFormGroupToPreview: (data: { type: string, stepId: string, kind: string, file?: File, index?: number }) => void;
        setActiveFormGroup: (formGroupId: string) => void;
        activeFormGroup: string | null;
        updateFormGroup: (id: string, data: Partial<FormGroupItem>) => void;
        deleteFormGroup: (id: string) => void;
        updateFormStep: (id: string, data: Partial<FormStep>) => void;
        deleteFormStep: (stepId: string) => void;
        moveFormGroupItem: (fromIndex: number, toIndex: number) => void;
        reorderFormGroupItem: (fromIndex: number, toIndex: number) => void;
    }
) {
    const [dragOver, setDragOver] = React.useState<{ stepId: string, index: number } | null>(null);

    function handleDrop(e: React.DragEvent, stepId: string, insertIndex: number) {
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
                } catch { }
            }
        }

        if (data && data.fromPanel) {
            appendFormGroupToPreview({
                type: data.type,
                stepId,
                kind: data.kind,
                file: data.file,
                index: insertIndex
            });
        }
    }

    function handleDragOver(e: React.DragEvent, stepId: string, insertIndex: number) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setDragOver({ stepId, index: insertIndex });
    }

    function handleDragLeave(e: React.DragEvent) {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOver(null);
        }
    }

    return (
        <div className={'xl:w-[640px] w-full 2xl:w-[700px] max-w-[1000px] flex flex-col pt-10 pb-20'}>
            {steps.filter(step => !step.deleted)
                .slice()
                .sort((a, b) => a.index - b.index)
                .map((step) => {
                    const groups = formGroups
                        .filter(item => item.formStep === step.id)
                        .slice()
                        .sort((a, b) => a.index - b.index);
                    return (
                        <div key={step.id} className="rounded-lg min-h-[80px] flex flex-col">
                            <EachFormStepContainer
                                updateFormStep={updateFormStep}
                                data={step}
                                onDelete={deleteFormStep}
                                isHidden={step.hidden}
                            >
                                <SortableContext
                                    items={groups.map(i => i.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div
                                        className="bg-card rounded-lg flex flex-col py-3 border relative"
                                        onDragLeave={handleDragLeave}
                                    >
                                        <div
                                            className="min-h-[20px] relative"
                                            onDrop={(e) => handleDrop(e, step.id, 0)}
                                            onDragOver={(e) => handleDragOver(e, step.id, 0)}
                                        >
                                            {dragOver?.stepId === step.id && dragOver?.index === 0 && (
                                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-6 bg-blue-500/30 border border-blue-500 rounded-md shadow-md animate-pulse" />
                                            )}
                                        </div>

                                        {groups.filter(item => !item.deleted).map((groupData, idx) => {
                                            const targetData = groupData.type === 'element'
                                                ? elements.find(el => el.id === groupData.targetID)
                                                : fields.find(field => field.id === groupData.targetID);
                                            if (!targetData) return null;

                                            return (
                                                <React.Fragment key={groupData.id}>
                                                    <EachFormGroup
                                                        onHide={() => updateFormGroup(groupData.id, {
                                                            hidden: !groupData.hidden
                                                        })}
                                                        onDelete={deleteFormGroup}
                                                        groupData={groupData}
                                                        targetData={targetData}
                                                        isHidden={step.hidden || groupData.hidden}
                                                        isActive={activeFormGroup === groupData.id}
                                                        onClick={(id) => {
                                                            setActiveFormGroup(id);
                                                        }}
                                                    />

                                                    <div
                                                        className="min-h-[20px] relative"
                                                        onDrop={(e) => handleDrop(e, step.id, idx + 1)}
                                                        onDragOver={(e) => handleDragOver(e, step.id, idx + 1)}
                                                    >
                                                        {dragOver?.stepId === step.id && dragOver?.index === (idx + 1) && (
                                                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-6 bg-blue-500/30 border border-blue-500 rounded-md shadow-md animate-pulse" />
                                                        )}
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}

                                        {groups.length === 0 && (
                                            <div
                                                className="min-h-[60px] mx-4 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm relative"
                                                onDrop={(e) => handleDrop(e, step.id, 0)}
                                                onDragOver={(e) => handleDragOver(e, step.id, 0)}
                                            >
                                                Drop elements here
                                                {dragOver?.stepId === step.id && dragOver?.index === 0 && (
                                                    <div className="absolute inset-2 border-2 border-blue-500 rounded-lg bg-blue-50/50 dark:bg-blue-950/50" />
                                                )}
                                            </div>
                                        )}
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