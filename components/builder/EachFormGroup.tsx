'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormElement, FormField, FormGroupItem } from "@/types/builder.types";
import FormElementRenderer from "./FormElementRenderer";
import FormFieldRenderer from "./FormFieldRenderer";
import { HiBars3, HiDocumentDuplicate, HiEye, HiEyeSlash, HiMiniStop, HiOutlineStop, HiTrash, } from "react-icons/hi2";
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '../ui/alert-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';


export default function EachFormGroup({
  groupData,
  targetData,
  isHidden,
  onClick,
  isActive = false,
  onDelete,
  onHide,
  onUpdate,
  onUpdateTarget,
  onDuplicate
}: {
  groupData: FormGroupItem;
  targetData: FormElement | FormField;
  isHidden: boolean;
  isActive?: boolean;
  onClick: (id: string) => void;
  onDelete: (groupID: string) => void;
  onHide: (groupID: string) => void;
  onUpdate: (id: string, data: Partial<FormGroupItem>) => void;
  onUpdateTarget: (id: string, data: Partial<FormElement | FormField>) => void;
  onDuplicate?: (formGroupID: string) => void;
}) {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: groupData.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div
      ref={setNodeRef}
      style={style} className="relative group select-none cursor-default"
      onClick={e => {
        e.stopPropagation();
        onClick(groupData.id);
      }}
    >
      {
        isActive && <small id='tool-bar' className={cn("px-2 flex gap-2 items-center rounded-tl-md rounded-tr-md bg-secondary text-secondary-foreground absolute top-[-1.2rem] left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity", {
          "opacity-100": isActive
        })}>
          {groupData.type === 'element' ? 'Element' : 'Field'}
          <button className="ml-2" onClick={e => { e.stopPropagation(); onHide(groupData.id); }}>
            {isHidden ? <HiEyeSlash /> : <HiEye />}
          </button>
          <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
            <AlertDialogTrigger asChild>
              <button onClick={e => { e.stopPropagation(); setShowDelete(true); }}>
                <HiTrash />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this group?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this group? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDelete(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => { onDelete(groupData.id); setShowDelete(false); }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {'required' in targetData && (
            <button
              onClick={e => {
                e.stopPropagation();
                onUpdateTarget(targetData.id, { required: !(targetData as FormField).required });
              }}
            >
              {
                (targetData as FormField).required ? <HiMiniStop /> : <HiOutlineStop />
              }
            </button>
          )}
          <button>
            <HiDocumentDuplicate />
          </button>
        </small>
      }
      <div className={cn("flex gap-2 px-9 py-2 pl-0", {
        'hover:outline-1 outline-secondary/30 hover:shadow-sm hover:outline-dashed': !isHidden,
        'outline-1 outline-secondary hover:outline-solid': isActive
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
        <div className={cn('flex flex-col gap-2 flex-1', { "opacity-40": isHidden })}>
          {groupData.type === 'element' ? (
            <FormElementRenderer data={targetData as FormElement} />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                {'label' in targetData && (
                  <label className="font-semibold text-base mb-1">
                    {targetData.label} {targetData.required && <span className='text-destructive'>*</span>}
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
