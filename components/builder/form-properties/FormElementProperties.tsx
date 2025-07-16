import { FormGroupItem } from '@/types/builder.types';
import React, { useEffect, useState } from 'react'
import BuilderRightPanelContainer from '../layout/BuilderRightPanelContainer';
import { usePreview } from '@/hooks/usePreview';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    formGroup: FormGroupItem;
}

export default function FormElementProperties({ formGroup }: Props) {
    const { updateElement, elements } = usePreview();
    const element = elements.find(e => e.id === formGroup.targetID);
    const [content, setContent] = useState(element?.content || '');

    useEffect(() => {
        setContent(element?.content || '');
    }, [element?.content]);

    return (
        <BuilderRightPanelContainer
            heading="Form Element Properties"
            subHeading="Configure the properties of the selected form element."
        >
            <div className='p-2'>
                {element && element.type === 'image' &&
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="content">Image URL</Label>
                        <Input
                            id="content"
                            placeholder="Element content"
                            className='bg-background'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            onBlur={() => updateElement(element.id, { content })}
                            onFocus={e => e.target.select()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateElement(element.id, { content });
                                }
                            }}
                        />
                    </div>
                }
            </div>
        </BuilderRightPanelContainer>
    )
}