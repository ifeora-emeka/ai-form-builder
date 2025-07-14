import React from 'react'
import FormFieldProperties from '../form-properties/FormFieldProperties'
import { usePreview } from '@/hooks/usePreview'
import FormElementProperties from '../form-properties/FormElementProperties';

export default function BuilderRightPanel() {
    const { activeFormGroup, activeFormSection, fields, formGroups} = usePreview();

    const activeGroup = formGroups.find(f => f.id === activeFormGroup);
    
    return (
        <>
            {activeGroup && activeGroup.type === 'field' && (
                <FormFieldProperties formGroup={activeGroup} />
            )}
            {
              activeGroup && activeGroup.type === 'element' && 
              <FormElementProperties formGroup={activeGroup} />
            }
        </>
    )
}
