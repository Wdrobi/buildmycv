'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(async () => (await import('react-quill')).default, {
  ssr: false,
  loading: () => <div className="w-full h-[200px] border border-gray-300 rounded-lg bg-gray-50" />,
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter text...',
  height = '200px',
}: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ],
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'align',
    'link',
  ];

  return (
    <div className="w-full">
      <style>{`
        .ql-container {
          font-size: 14px;
          border-bottom-left-radius: 0.5rem !important;
          border-bottom-right-radius: 0.5rem !important;
        }
        .ql-editor {
          min-height: ${height};
          padding: 12px;
        }
        .ql-toolbar {
          border-top-left-radius: 0.5rem !important;
          border-top-right-radius: 0.5rem !important;
          border: 1px solid rgb(209, 213, 219);
          background-color: white;
        }
        .ql-container {
          border: 1px solid rgb(209, 213, 219);
          border-top: none;
        }
        .ql-editor.ql-blank::before {
          color: rgb(107, 114, 128);
          font-style: normal;
        }
      `}</style>
      <QuillEditor
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white rounded-lg"
      />
    </div>
  );
}
