export type FormStep = {
    id: string;
    index: number;
    name: string | null;
    hidden: boolean;
}

export type FormSectionItem = {
    id: string;
    index: number;
    formStep: string; // for section ID

    type: 'element' | 'field';
    hidden: boolean;
}

export type FormField = {
    id: string;
    index: number;
    sectionItem: string; // form section item ID

    type: 'short-text' | 'long-text' | 'checkbox' | 'file-upload' | 'dropdown' | 'radio-group' | 'date-picker';
    label: string;
    info: string | null;
    required: boolean;
    options: string[];
    placeholder: string | null;
    validation: {
        minLength: number | null;
        maxLength: number | null;
        pattern: string | null;
    };
    defaultValue: string | null;
    hidden: boolean;
}

export type FormElement = {
    id: string;
    index: number;
    sectionItem: string; // form section item ID

    type: 'image' | 'rich-text' | 'plain-text' | 'divider' | 'video';
    content: string | null;
    hidden: boolean;
}
