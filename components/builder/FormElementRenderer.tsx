import { FormElement } from '@/types/builder.types';
import React from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Separator } from '@/components/ui/separator';

type Props = {
    data: FormElement;
}

export default function FormElementRenderer({ data }: Props) {
  switch (data.type) {
    case 'rich-text':
      return (
        <RichTextEditor
          content={data.content || ''}
          hideToolbar={true}
          className="border-none p-0 hover:bg-input/20"
        />
      );
    case 'plain-text':
      return (
        <div className="text-sm text-foreground">
          {data.content}
        </div>
      );
    case 'image':
      if (!data.content) return null;
      return (
        <div className="flex justify-center">
          <img
            src={data.content}
            alt="Form element"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      );
    case 'video':
      if (!data.content) return null;
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl aspect-video">
            <iframe
              src={data.content}
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