'use client'

import {usePreview} from "@/context/preview.context";
import EachFormStepContainer from "@/components/builder/EachFormStepContainer";
import EachFormSection from "@/components/builder/EachFormSection";

export default function BuilderPreview() {
    const {state: {steps, sectionItems}} = usePreview();
    return <>
        <div className={'xl:w-[90%] 2xl:w-[900px] flex flex-col gap-20 pt-10 pb-20'}>

            {
                steps.map((step) => (
                    <EachFormStepContainer
                        key={step.id}
                        data={step}
                    >
                        {
                            sectionItems.map((sectionItem, index) => (
                                <EachFormSection
                                    key={sectionItem.id}
                                    data={sectionItem}
                                />
                            ))
                        }
                    </EachFormStepContainer>
                ))
            }

        </div>
    </>
}
