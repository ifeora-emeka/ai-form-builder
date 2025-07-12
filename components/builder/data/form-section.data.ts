import { generateRandomID } from "@/lib/random";
import { FormElement, FormElementType } from "@/types/builder.types";

export const getFormElementData = ({
    type,
    index,
    formGroupID
}: {
    index: number;
    type: FormElementType;
    formGroupID: string
}): FormElement => {
    let content: string | null = null;
    switch (type) {
        case 'image':
            content = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
            break;
        case 'video':
            content = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            break;
        case 'rich-text':
            content = `# Welcome to the Form Builder\n\nThis is a **rich text** placeholder.\n\n- You can add lists\n- Format text\n- And more!`;
            break;
        case 'plain-text':
            content = 'This is a plain text placeholder.';
            break;
        case 'divider':
            content = null;
            break;
        default:
            content = '';
    }
    return {
        id: generateRandomID(12),
        index,
        formGroupID,
        type,
        content,
        hidden: false,
    };
}