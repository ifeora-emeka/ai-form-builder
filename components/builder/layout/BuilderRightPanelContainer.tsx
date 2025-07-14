import { ScrollArea } from '@radix-ui/react-scroll-area'
import React from 'react'

type Props = {
    heading: string;
    subHeading?: string;
    children: React.ReactNode;
}

export default function BuilderRightPanelContainer({ heading, subHeading, children }: Props) {
    return (
        <aside className={'w-[400px] h-screen border-l select-none'}>
            <div className='h-12 border-b bg-gradient-to-tr from-card via-card- to-muted/5 px-4 grid grid-cols-1'>
                <h2 className='font-semibold truncate'>{heading}</h2>
                {subHeading && <small className='text-sm text-muted-foreground truncate'>{subHeading}</small>}
            </div>
            <ScrollArea className="h-[calc(100vh-3rem)] overflow-y-auto bg-gradient-to-b from-card to-muted/40 relative">
                {children}
            </ScrollArea>
        </aside>
    )
}