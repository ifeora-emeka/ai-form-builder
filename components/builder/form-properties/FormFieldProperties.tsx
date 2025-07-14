import React from 'react'
import BuilderRightPanelContainer from '../layout/BuilderRightPanelContainer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { FormGroupItem } from '@/types/builder.types'

type Props = {
    formGroup: FormGroupItem;
}

export default function FormFieldProperties({ formGroup }: Props) {
    return (
        <BuilderRightPanelContainer
            heading="Form Field Properties"
            subHeading="Configure the properties of the selected form field."
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="label">Label</Label>
                    <Input id="label" placeholder="Field label" className='bg-background' />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="info">Info</Label>
                    <Textarea id="info" placeholder="Field info or description" className='bg-background' />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input id="placeholder" placeholder="Placeholder text" className='bg-background' />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="min">Min</Label>
                        <Input id="min" type="number" placeholder="Min value" className='bg-background' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="max">Max</Label>
                        <Input id="max" type="number" placeholder="Max value" className='bg-background' />
                    </div>
                </div>
                <hr />
                <div className='grid grid-cols-3 gap-4'>
                    <div className="flex items-center gap-2">
                        <Switch id="visible" defaultChecked />
                        <Label htmlFor="visible">Visible</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="required" />
                        <Label htmlFor="required">Required</Label>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
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
                                    <Button variant="destructive">Delete</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </BuilderRightPanelContainer>
    )
}
