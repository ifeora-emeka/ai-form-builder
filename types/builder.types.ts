export type FormStep = {
    id: string;
    index: number;
    name: string | null;
    hidden: boolean;
    deleted: boolean;
    new?: boolean;
}

export type FormGroupItem = {
    id: string;
    index: number;
    formStep: string; // for section ID

    type: 'element' | 'field';
    hidden: boolean;
    targetID: string; 
    deleted: boolean;
}


export type SelectOption = {
    label: string;
    value: string;
};

export type FormField = {
    id: string;
    index: number;
    formGroupID: string;
    type: FormFieldType;
    label: string;
    info: string | null;
    required: boolean;
    options: SelectOption[];
    placeholder: string | null;
    validation: {
        minLength: number | null;
        maxLength: number | null;
        pattern: string | null;
    };
    defaultValue: string | null;
    hidden: boolean;
    deleted: boolean;
}

export type FormElement = {
    id: string;
    index: number;
    formGroupID: string; // form section item ID

    type: FormElementType;
    content: string | null;
    hidden: boolean;
    deleted: boolean;
}

export type FormElementType = 'image' | 'rich-text' | 'plain-text' | 'divider' | 'video'
export type FormFieldType = 'short-text' | 'long-text' | 'checkbox' | 'file-upload' | 'dropdown' | 'radio-group' | 'date-picker';
