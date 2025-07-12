import {FormSectionItem} from "@/types/builder.types";

export default function EachFormSection ({data}:{data: FormSectionItem}){
    return <div className={'p-2 bg-card border rounded-lg shadow-sm'}>
        <h3 className={'text-lg font-semibold text-muted-foreground'}>{data.type} Section</h3>
        <p className={'text-sm text-muted-foreground'}>ID: {data.id}</p>
        <p className={'text-sm text-muted-foreground'}>Index: {data.index}</p>
        <p className={'text-sm text-muted-foreground'}>Hidden: {data.hidden ? 'Yes' : 'No'}</p>
        <p className={'text-sm text-muted-foreground'}>Form Step: {data.formStep}</p>
        <p className={'text-sm text-muted-foreground'}>Form Type: {data.type}</p>
    </div>
}
