'use client';
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area"
import React from "react";
import {
    HiPhoto,
    HiOutlineDocumentText,
    HiOutlineMinus,
    HiOutlinePencil,
    HiOutlineCheck,
    HiOutlinePlay,
    HiOutlineInboxArrowDown,
    HiSparkles,
    HiMagnifyingGlass
} from "react-icons/hi2";


export default function BuilderLeftPanel() {
    const [search, setSearch] = React.useState("");
    const leftPanelSections = [
        {
            label: 'Elements',
            items: [
                { label: 'Images', icon: HiPhoto },
                { label: 'Rich text', icon: HiOutlineDocumentText },
                { label: 'Plain text', icon: HiOutlinePencil },
                { label: 'Divider', icon: HiOutlineMinus },
                { label: 'Section', icon: HiOutlineDocumentText },
                { label: 'Button', icon: HiOutlineCheck },
                { label: 'Video', icon: HiOutlinePlay },
            ]
        },
        {
            label: 'Form fields',
            items: [
                { label: 'Short text', icon: HiOutlineDocumentText },
                { label: 'Long text', icon: HiOutlinePencil },
                { label: 'Checkbox', icon: HiOutlineCheck },
                { label: 'File upload', icon: HiOutlineInboxArrowDown },
                { label: 'Dropdown', icon: HiOutlineDocumentText },
                { label: 'Radio group', icon: HiOutlineCheck },
                { label: 'Date picker', icon: HiOutlineDocumentText },
                { label: 'Number', icon: HiOutlinePencil },
                { label: 'Email', icon: HiOutlineDocumentText },
                { label: 'Phone', icon: HiOutlineDocumentText },
                { label: 'URL', icon: HiOutlineDocumentText },
            ]
        }
    ];

    // Filter logic
    const filteredSections = leftPanelSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return <>
        <aside className={'w-[300px] h-screen bg-gradient-to-tl from-card via-card to-muted/20 border-r select-none sticky top-0'}>
            <div className={'h-12 border-b flex items-center px-2 bg-gradient-to-t from-card via-card to-muted/50'}>
                <h1 className={'font-bold text-xl flex gap-1 items-center'}>
                    <HiSparkles />
                    AI Form Builder
                </h1>
            </div>
            <div className={'h-12 border-b flex items-center px-2 relative bg-card'}>
                <span className="absolute left-4 text-muted-foreground">
                    <HiMagnifyingGlass className="h-5 w-5" />
                </span>
                <Input
                    placeholder={'Search..'}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>
            <ScrollArea className={' h-[calc(100vh-96px)] overflow-y-auto'}>
                <div className={'space-y-10 px-2 pt-4 pb-20'}>
                    {filteredSections.length === 0 ? (
                        <div className="text-muted-foreground text-center py-8">No results found.</div>
                    ) : (
                        filteredSections.map(section => (
                            <EachSection key={section.label} label={section.label}>
                                {section.items.map(item => (
                                    <EachItem key={item.label} label={item.label} icon={item.icon} />
                                ))}
                            </EachSection>
                        ))
                    )}
                </div>
            </ScrollArea>
        </aside>
    </>
}

const EachItem = ({label, icon: Icon}: { label: string; icon: React.ElementType }) => {
    return (
        <button
            className={'hover:border-primary bg-card cursor-grab border rounded-md shadow-sm hover:shadow-md flex justify-start items-center p-2'}
        >
            <span className={'flex items-center'}>
                <Icon className="mr-2 h-5 w-5"/>
                {label}
            </span>
        </button>
    );
}

const EachSection = ({label, children}: { label: string; children: React.ReactNode; }) => {
    return <div className={'flex flex-col gap-2'}>
        <h6 className={'font-bold'}>{label}</h6>
        {children}
    </div>
}
