import { ScrollArea } from '@radix-ui/react-scroll-area'
import React from 'react'

export default function BuilderRightPanel() {
    return (
        <aside className={'w-[400px] h-screen border-l'}>
            <div className='h-12 border-b bg-gradient-to-b from-card via-card to-muted/5'>

            </div>
            <ScrollArea className="h-[calc(100vh-3rem)] overflow-y-auto bg-gradient-to-b from-card to-muted/40">
            
            </ScrollArea>
        </aside>
    )
}
