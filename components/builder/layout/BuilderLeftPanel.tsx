'use client';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import React from "react";
import {
    HiOutlineDocumentText,
    HiOutlineMinus,
    HiOutlinePencil,
    HiOutlineCheck,
    HiOutlinePlay,
    HiOutlineChevronDown,
    HiOutlineCalendar,
    HiSparkles,
    HiMagnifyingGlass
} from "react-icons/hi2";
import { RxText } from "react-icons/rx";
import { FaRegFileAlt } from 'react-icons/fa';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { RiFileUploadLine } from 'react-icons/ri';
import Image from "next/image";


export default function BuilderLeftPanel() {
    const [search, setSearch] = React.useState("");
    const leftPanelSections = [
        {
            label: 'Elements',
            items: [
                { label: 'Image', slug: 'image', icon: RxText, kind: 'element' },
                { label: 'Rich text', slug: 'rich-text', icon: HiOutlineDocumentText, kind: 'element' },
                { label: 'Plain text', slug: 'plain-text', icon: FaRegFileAlt, kind: 'element' },
                { label: 'Divider', slug: 'divider', icon: HiOutlineMinus, kind: 'element' },
                { label: 'Video', slug: 'video', icon: HiOutlinePlay, kind: 'element' },
            ]
        },
        {
            label: 'Form fields',
            items: [
                { label: 'Short text', slug: 'short-text', icon: HiOutlineDocumentText, kind: 'field' },
                { label: 'Paragraph', slug: 'long-text', icon: HiOutlinePencil, kind: 'field' },
                { label: 'Checkbox', slug: 'checkbox', icon: HiOutlineCheck, kind: 'field' },
                { label: 'File upload', slug: 'file-upload', icon: RiFileUploadLine, kind: 'field' },
                { label: 'Dropdown', slug: 'dropdown', icon: HiOutlineChevronDown, kind: 'field' },
                { label: 'Radio group', slug: 'radio-group', icon: MdOutlineRadioButtonChecked, kind: 'field' },
                { label: 'Date picker', slug: 'date-picker', icon: HiOutlineCalendar, kind: 'field' },
            ]
        }
    ];

    const filteredSections = leftPanelSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return <>
        <aside className={'w-[300px] h-screen border-r select-none sticky top-0'}>
            <div className={'h-12 flex items-center px-2 bg-gradient-to-t from-card via-card to-muted/50'}>
                <div className={'font-bold text-xl flex gap-2 items-center'}>
                    <Image width={30} height={30} src={'/logo.png'} alt='logo' />
                    <h1>FormAI</h1>
                </div>
            </div>
            <div className={'h-12 border-b bg-card flex items-center px-2 relative bg-card-'}>
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
            <ScrollArea className={' h-[calc(100vh-96px)] overflow-y-auto bg-gradient-to-l from-card via-card to-muted/20'}>
                <div className={'space-y-10 px-2 pt-4 pb-20'}>
                    {filteredSections.length === 0 ? (
                        <div className="text-muted-foreground text-center py-8">No results found.</div>
                    ) : (
                        filteredSections.map(section => (
                            <EachSection key={section.label} label={section.label}>
                                {section.items.map(item => (
                                    <EachItem key={item.label} label={item.label} icon={item.icon} slug={item.slug} kind={item.kind as 'element' | 'field'} />
                                ))}
                            </EachSection>
                        ))
                    )}
                </div>
            </ScrollArea>
        </aside>
    </>
}

const EachItem = ({ label, icon: Icon, slug, kind }: { label: string; icon: React.ElementType; slug: string; kind: 'element' | 'field' }) => {
    const [isDragging, setIsDragging] = React.useState(false);

    function handleDragStart(e: React.DragEvent) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('application/json', JSON.stringify({ type: slug, kind, fromPanel: true }));
        setIsDragging(true);
    }

    function handleDragEnd() {
        setIsDragging(false);
    }

    return (
        <div
            className={`hover:border-primary bg-card cursor-grab border rounded-md shadow-sm hover:shadow-md flex justify-start items-center p-2 transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : ''
                }`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <span className={'flex items-center'}>
                <Icon className="mr-2 h-5 w-5" />
                {label}
            </span>
        </div>
    );
}

const EachSection = ({ label, children }: { label: string; children: React.ReactNode; }) => {
    return <div className={'flex flex-col gap-2'}>
        <h6 className={'font-bold'}>{label}</h6>
        {children}
    </div>
}
