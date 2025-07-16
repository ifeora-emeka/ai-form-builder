import { FormElement } from '@/types/builder.types';
import React from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Separator } from '@/components/ui/separator';

type Props = {
    data: FormElement;
    onUpdate: (id: string, data: Partial<FormElement>) => void;
}

export default function FormElementRenderer({ data, onUpdate }: Props) {
  const content = data.content || '';
  switch (data.type) {
    case 'rich-text':
      return (
        <RichTextEditor
          content={content}
          hideToolbar={true}
          className="border-none p-0"
          onChange={val => onUpdate(data.id, { content: val })}
          onBlur={() => {}}
        />
      );
    case 'plain-text':
      return (
        <div className="text-sm text-foreground">
          {content}
        </div>
      );
    case 'image':
      if (!content) return null;
      return (
        <div className="flex justify-center max-h-[500px] items-center">
          <img
            src={content}
            alt="Form element"
            className="max-w-full h-full rounded-md object-cover"
          />
        </div>
      );
    case 'video':
      if (!content) return null;
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl aspect-video">
            <iframe
              src={content}
              className="w-full h-full rounded-md"
              frameBorder="0"
              allowFullScreen
              title="Form video"
            />
          </div>
        </div>
      );
    case 'divider':
      return <Separator className="my-4" />;
    default:
      return null;
  }
}