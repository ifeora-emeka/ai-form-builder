'use client';

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Toggle } from '@/components/ui/toggle';
import React from 'react';
import {
  HiBold,
  HiItalic,
  HiListBullet,
  HiQueueList,
  HiCodeBracket
} from 'react-icons/hi2';
import TurndownService from 'turndown';

type Props = {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  hideToolbar?: boolean;
  debounce?: number;
  className?: string;
};

export default function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start typing...',
  hideToolbar = false,
  debounce = 300,
  className = ''
}: Props) {
  const [debouncedContent, setDebouncedContent] = React.useState(content);
  
  const turndownService = React.useMemo(() => {
    const service = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      strongDelimiter: '**',
      emDelimiter: '*'
    });
    
    service.addRule('strikethrough', {
      filter: ['del', 's'],
      replacement: function (content) {
        return '~~' + content + '~~';
      }
    });
    
    return service;
  }, []);

  const markdownToHtml = React.useCallback((markdownText: string) => {
    if (!markdownText.trim()) return '<p></p>';
    
    let html = markdownText
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
      .replace(/^\d+\. (.*$)/gm, '<ol><li>$1</li></ol>')
      .replace(/<\/ul>\s*<ul>/g, '')
      .replace(/<\/ol>\s*<ol>/g, '');

    const lines = html.split('\n').filter(line => line.trim());
    const processedLines = [];
    
    for (const line of lines) {
      if (!line.match(/^<(h[1-6]|ul|ol|li)/)) {
        if (line.trim() && !line.match(/^<(strong|em|del|code)/)) {
          processedLines.push(`<p>${line}</p>`);
        } else {
          processedLines.push(line);
        }
      } else {
        processedLines.push(line);
      }
    }
    
    return processedLines.join('');
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: markdownToHtml(content),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none dark:prose-invert focus:outline-none min-h-[50px] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6- [&_h1]:mb-4 [&_h1]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5- [&_h2]:mb-3 [&_h2]:text-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4- [&_h3]:mb-2 [&_h3]:text-foreground [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3- [&_h4]:mb-2 [&_h4]:text-foreground [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-3- [&_h5]:mb-1 [&_h5]:text-foreground [&_h6]:text-sm [&_h6]:font-medium [&_h6]:mt-2- [&_h6]:mb-1 [&_h6]:text-foreground [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-foreground [&_ul]:my-2 [&_ol]:my-2 [&_li]:text-sm [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setDebouncedContent(markdown);
    },
  });

  React.useEffect(() => {
    if (editor && content !== undefined) {
      const currentHtml = editor.getHTML();
      const newHtml = markdownToHtml(content);
      if (newHtml !== currentHtml) {
        editor.commands.setContent(newHtml, false);
      }
    }
  }, [content, editor, markdownToHtml]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange && debouncedContent !== content) {
        onChange(debouncedContent);
      }
    }, debounce);
    return () => clearTimeout(timer);
  }, [debouncedContent, debounce, onChange, content]);

  const setHeading = React.useCallback((level: number) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
  }, [editor]);

  const toggleBold = React.useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = React.useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleBulletList = React.useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = React.useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const toggleCodeBlock = React.useCallback(() => {
    editor?.chain().focus().toggleCodeBlock().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`relative rounded-lg border ${className}`}>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ 
            duration: 100,
            placement: 'top',
            maxWidth: 'none',
          }}
          className="flex items-center gap-2 rounded-lg border bg-background/95 backdrop-blur-sm p-2 shadow-lg"
        >
          <ToggleGroup
            type="single"
            value={
              editor.isActive('heading', { level: 1 }) ? 'h1' :
              editor.isActive('heading', { level: 2 }) ? 'h2' :
              editor.isActive('heading', { level: 3 }) ? 'h3' :
              editor.isActive('heading', { level: 4 }) ? 'h4' :
              editor.isActive('heading', { level: 5 }) ? 'h5' :
              editor.isActive('heading', { level: 6 }) ? 'h6' :
              'p'
            }
            onValueChange={(value) => {
              if (value === 'p') {
                setHeading(0);
              } else if (value) {
                const level = parseInt(value.replace('h', ''));
                setHeading(level);
              }
            }}
            className="h-8"
          >
            <ToggleGroupItem value="p" className="h-8 px-3 text-xs">
              P
            </ToggleGroupItem>
            <ToggleGroupItem value="h1" className="h-8 px-3 text-xs font-bold">
              H1
            </ToggleGroupItem>
            <ToggleGroupItem value="h2" className="h-8 px-3 text-xs font-semibold">
              H2
            </ToggleGroupItem>
            <ToggleGroupItem value="h3" className="h-8 px-3 text-xs font-medium">
              H3
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="h-6 w-px bg-border" />
          
          <Toggle
            pressed={editor.isActive('bold')}
            onPressedChange={toggleBold}
            size="sm"
            className="h-8 w-8"
          >
            <HiBold className="h-4 w-4" />
          </Toggle>
          
          <Toggle
            pressed={editor.isActive('italic')}
            onPressedChange={toggleItalic}
            size="sm"
            className="h-8 w-8"
          >
            <HiItalic className="h-4 w-4" />
          </Toggle>
          
          <div className="h-6 w-px bg-border" />
          
          <Toggle
            pressed={editor.isActive('bulletList')}
            onPressedChange={toggleBulletList}
            size="sm"
            className="h-8 w-8"
          >
            <HiListBullet className="h-4 w-4" />
          </Toggle>
          
          <Toggle
            pressed={editor.isActive('orderedList')}
            onPressedChange={toggleOrderedList}
            size="sm"
            className="h-8 w-8"
          >
            <HiQueueList className="h-4 w-4" />
          </Toggle>
          
          <Toggle
            pressed={editor.isActive('codeBlock')}
            onPressedChange={toggleCodeBlock}
            size="sm"
            className="h-8 w-8"
          >
            <HiCodeBracket className="h-4 w-4" />
          </Toggle>
        </BubbleMenu>
      )}
      
      <EditorContent
        editor={editor}
        className="min-h-[120px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none"
      />
    </div>
  );
}
