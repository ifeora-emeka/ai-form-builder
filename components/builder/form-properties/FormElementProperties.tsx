import { FormGroupItem } from '@/types/builder.types';
import React from 'react'
import BuilderRightPanelContainer from '../layout/BuilderRightPanelContainer';

type Props = {
    formGroup: FormGroupItem;
}

export default function FormElementProperties({ formGroup }: Props) {
    return (
        <BuilderRightPanelContainer
            heading="Form Element Properties"
            subHeading="Configure the properties of the selected form element."
        >
            <div className="flex flex-col gap-6 p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto harum, corporis voluptates aut deleniti tempore doloribus, architecto odit aliquid reprehenderit assumenda et ipsum porro iste quia! Recusandae repellat earum eligendi!
            </div>
        </BuilderRightPanelContainer>
    )
}