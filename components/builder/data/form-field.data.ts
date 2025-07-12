import { generateRandomID } from "@/lib/random";
import { FormField, FormFieldType } from "@/types/builder.types";

export const getFormFieldData = ({
    index,
    formGroupID,
    type
}: {
    index: number;
    formGroupID: string;
    type: FormFieldType
}): FormField => {
    return {
        id: generateRandomID(12),
        index,
        formGroupID,
        type,
        label: 'Field Label',
        info: null,
        required: false,
        options: [],
        placeholder: null,
        validation: {
            minLength: 0,
            maxLength: 100,
            pattern: null,
        },
        defaultValue: null,
        hidden: false,
    }
}
