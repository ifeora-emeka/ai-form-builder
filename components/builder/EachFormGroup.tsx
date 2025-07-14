'use client'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormElement, FormField, FormGroupItem } from "@/types/builder.types";
import FormElementRenderer from "./FormElementRenderer";
import FormFieldRenderer from "./FormFieldRenderer";
import { HiBars3, HiOutlineTrash } from "react-icons/hi2";
import { cn } from '@/lib/utils';

export default function EachFormGroup({
  groupData,
  targetData,
  stepHidden = false
}: {
  groupData: FormGroupItem;
  targetData: FormElement | FormField;
  stepHidden?: boolean;
}) {
  const isHidden = groupData.hidden || stepHidden;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: groupData.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative group select-none">
      {
        !isHidden && <small className="px-2 flex gap-2 items-center rounded-tl-md rounded-tr-md bg-purple-400 text-white absolute top-[-1.2rem] left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          {groupData.type === 'element' ? 'Element' : 'Field'}
          <button aria-label="Delete group">
            <HiOutlineTrash />
          </button>
        </small>
      }
      <div className={cn("flex gap-2 px-9 py-2 pl-0", {
        'hover:outline-1 outline-purple-500': !isHidden
      })}>
        <div
          className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity"
          id="drag-handle"
          {...attributes}
          {...listeners}
        >
          <button aria-label="Drag field" className="px-2 flex items-center justify-center rounded-full transition-colors cursor-grab">
            <HiBars3 />
          </button>
        </div>
        <div className={cn('flex flex-col gap-2 flex-1', { "opacity-40": stepHidden })}>
          {groupData.type === 'element' ? (
            <FormElementRenderer data={targetData as FormElement} />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                {'label' in targetData && (
                  <label className="font-semibold text-base text-neutral-800 mb-1">
                    {targetData.label}
                  </label>
                )}
                {'info' in targetData && targetData.info && (<small className="text-muted-foreground">{targetData.info}</small>)}
              </div>
              <FormFieldRenderer data={targetData as FormField} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
