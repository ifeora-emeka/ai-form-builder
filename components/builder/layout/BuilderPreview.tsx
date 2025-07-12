'use client'

import { usePreview } from "@/context/preview.context";
import EachFormStepContainer from "@/components/builder/EachFormStepContainer";
import EachFormGroup from "@/components/builder/EachFormGroup";
import React, { useEffect } from "react";

export default function BuilderPreview() {
    const { state: { steps, sectionItems, elements, fields } } = usePreview();
    const [ready, setReady] = React.useState(false);

    useEffect(() => {
        setReady(true);
    },[]);

    if(!ready) return null;

    return <>
        <div className={'xl:w-[90%] 2xl:w-[900px] flex flex-col gap-20 pt-10 pb-20'}>

            {
                steps
                  .slice()
                  .sort((a, b) => a.index - b.index)
                  .map((step) => (
                    <EachFormStepContainer
                        key={step.id}
                        data={step}
                    >
                        <div className="bg-card rounded-lg flex flex-col gap-6">
                            {
                                sectionItems
                                  .filter(item => item.formStep === step.id)
                                  .slice()
                                  .sort((a, b) => a.index - b.index)
                                  .map((groupData) => {
                                    const targetData = groupData.type === 'element' ? elements.find(el => el.id === groupData.targetID) :
                                        fields.find(field => field.id === groupData.targetID);
                                    if (!targetData) return null;
                                    return <EachFormGroup
                                        key={groupData.id}
                                        groupData={groupData}
                                        targetData={targetData}
                                    />
                                })}
                        </div>
                    </EachFormStepContainer>
                ))
            }

        </div>
    </>
}
