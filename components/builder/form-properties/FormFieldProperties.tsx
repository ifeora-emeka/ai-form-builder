import React, { useMemo, useRef, useState, useEffect } from 'react'
import BuilderRightPanelContainer from '../layout/BuilderRightPanelContainer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger, 
    AlertDialogContent, AlertDialogHeader, 
    AlertDialogTitle, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogCancel, AlertDialogAction 
} from '@/components/ui/alert-dialog';
import { FormGroupItem } from '@/types/builder.types'
import { usePreview } from '@/hooks/usePreview'

type Props = {
    formGroup: FormGroupItem;
}

export default function FormFieldProperties({ formGroup }: Props) {
    const { fields, updateFormField, updateFormGroup, deleteFormGroup } = usePreview();
    const field = useMemo(() => fields.find(f => f.id === formGroup.targetID), [fields, formGroup.targetID]);
    const [label, setLabel] = useState(field?.label || '');
    const [info, setInfo] = useState(field?.info || '');
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setLabel(field?.label || '');
        setInfo(field?.info || '');
    }, [field?.label, field?.info]);

    const handleFieldUpdate = (key: 'label' | 'info', value: string) => {
        if (field) {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                updateFormField(field.id, { [key]: value });
            }, 300);
        }
    };

    if (!field) return null;

    return (
        <BuilderRightPanelContainer
            heading="Form Field Properties"
            subHeading="Configure the properties of the selected form field."
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="label">Label</Label>
                    <Input id="label" placeholder="Field label" className='bg-background' value={label} onChange={e => { setLabel(e.target.value); handleFieldUpdate('label', e.target.value); }} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="info">Info</Label>
                    <Textarea id="info" placeholder="Field info or description" className='bg-background' value={info} onChange={e => { setInfo(e.target.value); handleFieldUpdate('info', e.target.value); }} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input id="placeholder" placeholder="Placeholder text" className='bg-background' value={field.placeholder || ''} onChange={e => updateFormField(field.id, { placeholder: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="min">Min</Label>
                        <Input id="min" type="number" placeholder="Min value" className='bg-background' value={field.validation.minLength ?? ''} onChange={e => updateFormField(field.id, { validation: { ...field.validation, minLength: Number(e.target.value) } })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="max">Max</Label>
                        <Input id="max" type="number" placeholder="Max value" className='bg-background' value={field.validation.maxLength ?? ''} onChange={e => updateFormField(field.id, { validation: { ...field.validation, maxLength: Number(e.target.value) } })} />
                    </div>
                </div>
                <hr />
                <div className='grid grid-cols-3 gap-4'>
                    <div className="flex items-center gap-2">
                        <Switch id="visible" checked={!formGroup.hidden} onCheckedChange={v => updateFormGroup(formGroup.id, { hidden: !v })} />
                        <Label htmlFor="visible">Visible</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="required" checked={field.required} onCheckedChange={v => updateFormField(field.id, { required: v })} />
                        <Label htmlFor="required">Required</Label>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size='sm'
                                variant="outline"
                                className='bg-destructive/10 border-destructive text-destructive hover:text-destructive'
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Field</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this field? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button variant="destructive" onClick={() => deleteFormGroup(formGroup.id)}>Delete</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </BuilderRightPanelContainer>
    )
}
