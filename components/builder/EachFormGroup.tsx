import { FormElement, FormField, FormGroupItem } from "@/types/builder.types";
import FormElementRenderer from "./FormElementRenderer";
import FormFieldRenderer from "./FormFieldRenderer";
import { Button } from "../ui/button";
import { HiBars3, HiOutlineTrash } from "react-icons/hi2";

export default function EachFormGroup({ 
    groupData, 
    targetData 
}: { 
    groupData: FormGroupItem; 
    targetData: FormElement | FormField 
}) {
    return (
        <div className="relative group select-none">
            <small className="px-2 rounded-tl-lg rounded-tr-lg bg-purple-400 text-white absolute top-[-1.2rem] left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                {groupData.type === 'element' ? 'Element' : 'Field'}
            </small>
            <div className="flex gap-2 hover:outline-1 outline-purple-500 px-9 py-2 pl-0">
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" aria-label="Drag field">
                        <HiBars3 />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Delete field">
                        <HiOutlineTrash />
                    </Button>
                </div>
                <div className={
                    'flex flex-col gap-2 flex-1'
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
            </div>
        </div>
    );
}
