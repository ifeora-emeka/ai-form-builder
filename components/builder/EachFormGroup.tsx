import { FormElement, FormField, FormGroupItem } from "@/types/builder.types";
import FormElementRenderer from "./FormElementRenderer";
import FormFieldRenderer from "./FormFieldRenderer";

export default function EachFormGroup({ groupData, targetData }: { groupData: FormGroupItem; targetData: FormElement | FormField }) {
    return (
        <div className={
            'flex flex-col gap-2'
        }>
            {groupData.type === 'element' ? (
                <FormElementRenderer data={targetData as FormElement} />
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        {'label' in targetData && (
                            <span className="font-semibold text-base text-neutral-800 mb-1">
                                {targetData.label}
                            </span>
                        )}
                        {
                            'info' in targetData && targetData.info && (<small className="text-muted-foreground">{targetData.info}</small>)
                        }
                    </div>
                    <FormFieldRenderer data={targetData as FormField} />
                </div>
            )}
        </div>
    );
}
