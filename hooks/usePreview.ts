"use client";
import React from "react";
import { usePreviewContext } from '@/context/preview.context'
import { FormGroupItem, FormElementType, FormFieldType, FormStep, FormField, FormElement } from '@/types/builder.types'
import { getFormElementData } from '@/components/builder/data/form-section.data'
import { getFormFieldData } from '@/components/builder/data/form-field.data'
import { generateRandomID } from '@/lib/random'
import { debounce } from 'lodash'

export function usePreview() {
    const ctx = usePreviewContext();
    const { state, setState, undo, redo, canUndo, canRedo, setActiveFormGroup, activeFormGroup, activeFormSection } = ctx;
    
    const updateElement = React.useMemo(() => {
        return debounce((elementId: string, data: Partial<FormElement>) => {
            setState(prev => {
                const elements = prev.elements.map(el =>
                    el.id === elementId ? { ...el, ...data } : el
                );
                return { ...prev, elements };
            });
        }, 300);
    }, [setState]);

    function deleteFormStep(stepId: string) {
        setState(prev => ({
            ...prev,
            steps: prev.steps.map(s => s.id === stepId ? { ...s, deleted: true } : s)
        }));
    };

    function moveFormGroupItem(
        fromStep: string,
        toStep: string,
        fromIndex: number,
        toIndex: number
    ) {
        const items = [...state.formGroups]
        const moving = items.filter(
            (item) => item.formStep === fromStep && item.index === fromIndex
        )[0]
        if (!moving) return
        const filtered = items.filter((item) => item !== moving)
        const updated = filtered.map((item) => {
            if (item.formStep === fromStep && item.index > fromIndex) {
                return { ...item, index: item.index - 1 }
            }
            if (item.formStep === toStep && item.index >= toIndex) {
                return { ...item, index: item.index + 1 }
            }
            return item
        })
        moving.formStep = toStep
        moving.index = toIndex
        setState((prev) => ({
            ...prev,
            formGroups: [...updated, moving],
        }))
    }


    function updateFormField(fieldId: string, data: Partial<FormField>) {
        setState(prev => {
            const fields = prev.fields.map(f =>
                f.id === fieldId ? { ...f, ...data } : f
            );
            return { ...prev, fields };
        });
    }

    function updateFormGroup(formGroupId: string, data: Partial<FormGroupItem>) {
        setState(prev => {
            const formGroups = prev.formGroups.map(fg =>
                fg.id === formGroupId ? { ...fg, ...data } : fg
            );
            return { ...prev, formGroups };
        });
    }

    function deleteFormGroup(formGroupId: string) {
        setState(prev => {
            const formGroups = prev.formGroups.map(fg =>
                fg.id === formGroupId ? { ...fg, deleted: true } : fg
            );
            return { ...prev, formGroups };
        });
    }

    function reorderFormGroupItem(step: string, oldIndex: number, newIndex: number) {
        const items = state.formGroups
            .filter((item) => item.formStep === step)
            .sort((a, b) => a.index - b.index)

        if (oldIndex === newIndex) return

        const moving = items[oldIndex]
        const rest = items.filter((_, i) => i !== oldIndex)
        rest.splice(newIndex, 0, moving)

        const updated = state.formGroups.map((item) => {
            if (item.formStep !== step) return item
            const idx = rest.findIndex((i) => i.id === item.id)
            return { ...item, index: idx }
        });

        setState((prev) => ({ ...prev, formGroups: updated }))
    }

    function appendFormGroupToPreview({
        type,
        stepId,
        kind,
        file,
        index
    }: {
        type: FormElementType | FormFieldType,
        stepId: string,
        kind: 'element' | 'field',
        file?: File,
        index?: number
    }) {
        let newGroupItem: FormGroupItem, newElement: any, newField: any;
        const groupIndex = typeof index === 'number' ? index : state.formGroups.filter(i => i.formStep === stepId).length;
        
        setState(prev => {
            const items = prev.formGroups.filter(item => item.formStep === stepId).sort((a, b) => a.index - b.index);
            let updatedformGroups = [...prev.formGroups];
            if (kind === 'element') {
                newElement = getFormElementData({ type: type as FormElementType, index: groupIndex, formGroupID: '' });
                if (type === 'image' && file) {
                    newElement.content = URL.createObjectURL(file);
                }
                newGroupItem = {
                    id: generateRandomID(12),
                    index: groupIndex,
                    formStep: stepId,
                    type: 'element',
                    hidden: false,
                    targetID: newElement.id,
                    deleted: false
                };
                updatedformGroups = updatedformGroups.map(item => {
                    if (item.formStep === stepId && item.index >= groupIndex) {
                        return { ...item, index: item.index + 1 };
                    }
                    return item;
                });
                updatedformGroups.push(newGroupItem);
                return {
                    ...prev,
                    formGroups: updatedformGroups,
                    elements: [...prev.elements, { ...newElement, index: groupIndex, formGroupID: newGroupItem.id }]
                };
            } else if (kind === 'field') {
                newField = getFormFieldData({ type: type as FormFieldType, index: groupIndex, formGroupID: '' });
                newGroupItem = {
                    id: generateRandomID(12),
                    index: groupIndex,
                    formStep: stepId,
                    type: 'field',
                    hidden: false,
                    targetID: newField.id,
                    deleted: false
                };
                updatedformGroups = updatedformGroups.map(item => {
                    if (item.formStep === stepId && item.index >= groupIndex) {
                        return { ...item, index: item.index + 1 };
                    }
                    return item;
                });
                updatedformGroups.push(newGroupItem);
                return {
                    ...prev,
                    formGroups: updatedformGroups,
                    fields: [...prev.fields, { ...newField, index: groupIndex, formGroupID: newGroupItem.id }]
                };
            }
            return prev;
        });
    }

    function updateFormStep(id: string, data: Partial<FormStep>) {
        setState(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === id ? { ...step, ...data, new: false } : step
            )
        }))
    }

    function addFormStep(topFormStep?: number) {
        setState(prev => {
            const insertIndex = typeof topFormStep === 'number' ? topFormStep + 1 : prev.steps.length;
            const newStepId = `step-${Date.now()}`;

            const updatedSteps = prev.steps.map(step => {
                if (step.index >= insertIndex) {
                    return { ...step, index: step.index + 1 };
                }
                return step;
            });

            updatedSteps.push({
                id: newStepId,
                index: insertIndex,
                name: null,
                hidden: false,
                deleted: false,
                new: true
            } as FormStep);

            updatedSteps.sort((a, b) => a.index - b.index);

            const updatedFormGroups = prev.formGroups.map(group => {
                const step = prev.steps.find(s => s.id === group.formStep);
                if (step && step.index >= insertIndex) {

                    const newStep = updatedSteps.find(s => s.index === step.index + 1);
                    return { ...group, formStep: newStep ? newStep.id : group.formStep };
                }
                return group;
            });
            return {
                ...prev,
                steps: updatedSteps,
                formGroups: updatedFormGroups,
            };
        });
    }

    return {
        ...state,
        moveFormGroupItem,
        reorderFormGroupItem,
        appendFormGroupToPreview,
        updateFormStep,
        updateFormField,
        updateFormGroup,
        updateElement,
        deleteFormGroup,
        deleteFormStep,
        undo,
        redo,
        canUndo,
        canRedo,
        setActiveFormGroup,
        activeFormGroup,
        activeFormSection,
        addFormStep,
    }
}
