import { FormField } from '@/types/builder.types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import React from 'react';

type Props = {
    data: FormField;
};

export default function FormFieldRenderer({ data }: Props) {
  switch (data.type) {
    case 'short-text':
      return <Input  placeholder={data.placeholder || ''} defaultValue={data.defaultValue || ''} />
    case 'long-text':
      return <Textarea placeholder={data.placeholder || ''} defaultValue={data.defaultValue || ''} />
    case 'checkbox':
      const [checkedValues, setCheckedValues] = React.useState<string[]>([]);
      const handleCheckboxChange = (value: string) => {
        setCheckedValues(prev =>
          prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
      };
      return (
        <div className="flex flex-col gap-2">
          {data.options.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 rounded-md cursor-pointer">
              <Checkbox
                checked={checkedValues.includes(opt.value)}
                onCheckedChange={() => handleCheckboxChange(opt.value)}
                id={`checkbox-${opt.value}`}
              />
              <span className="text-sm text-foreground/90">{opt.label}</span>
            </label>
          ))}
        </div>
      )
    case 'dropdown':
      return (
        <Select defaultValue={data.defaultValue || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={data.placeholder || 'Select option'} />
          </SelectTrigger>
          <SelectContent>
            {data.options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case 'radio-group':
      // Use local state for demo; in real app, lift state up
      const [selected, setSelected] = React.useState(data.defaultValue || '');
      return (
        <RadioGroup
          className="flex flex-col gap-2"
          value={selected}
          onValueChange={setSelected}
        >
          {data.options.map(opt => (
            <div key={opt.value} className="flex items-center gap-2 rounded-md">
              <RadioGroupItem value={opt.value} id={`radio-${opt.value}`} />
              <label htmlFor={`radio-${opt.value}`} className="text-sm cursor-pointer">{opt.label}</label>
            </div>
          ))}
        </RadioGroup>
      )
    case 'date-picker':
      return <Calendar mode="single" selected={undefined} />
    case 'file-upload':
      return <Input type="file" />
    default:
      return null;
  }
}