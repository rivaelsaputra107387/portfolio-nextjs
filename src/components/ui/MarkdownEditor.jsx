"use client";

import { useState, useRef } from "react";
import { Bold, Italic, Quote, List, ListOrdered, Heading3, Link, Eye, Edit3 } from "lucide-react";

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Tulis konten di sini...",
  rows = 10,
  id = "markdown-editor"
}) {
  const [mode, setMode] = useState("write"); // write | preview
  const textareaRef = useRef(null);

  const insertMarkdown = (before, after = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + selected + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    // Call parent's onChange
    onChange(newValue);

    // Reposition cursor after selection insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  // Helper parser for Markdown Preview matching the style of Next.js portfolio
  const parseMarkdown = (content) => {
    if (!content) return <p className="text-muted italic text-xs py-4 text-center">Belum ada konten pratinjau</p>;
    
    return content.split("\n\n").map((paragraph, i) => {
      // Heading 3
      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={i} className="text-base md:text-lg font-bold text-white mt-5 mb-2.5 border-b border-surface-border/40 pb-1.5">
            {paragraph.replace("### ", "")}
          </h3>
        );
      }
      // General Bold Headings (Legacy mapping from blog)
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3 key={i} className="text-sm md:text-base font-bold text-white mt-5 mb-2.5">
            {paragraph.replace(/\*\*/g, "")}
          </h3>
        );
      }
      // Blockquote
      if (paragraph.startsWith("> ")) {
        return (
          <blockquote key={i} className="border-l-4 border-accent pl-4 italic text-muted-light my-4 text-sm bg-surface-card/35 py-2 pr-2 rounded-r-lg">
            {paragraph.replace("> ", "")}
          </blockquote>
        );
      }
      // Lists (Unordered & Ordered)
      if (paragraph.startsWith("- ") || paragraph.match(/^\d+\./)) {
        const items = paragraph.split("\n");
        const isOrdered = paragraph.match(/^\d+\./);
        const Tag = isOrdered ? "ol" : "ul";
        return (
          <Tag key={i} className={`pl-5 mb-4 text-muted-light text-xs md:text-sm space-y-1 ${isOrdered ? "list-decimal" : "list-disc"}`}>
            {items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{
                __html: item
                  .replace(/^[-\d.]+\s*/, "")
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="text-muted-light italic">$1</em>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-semibold">$1</a>')
              }} />
            ))}
          </Tag>
        );
      }
      // Default paragraph with bold/italic/link parsing
      return (
        <p key={i} className="text-muted-light text-xs md:text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{
          __html: paragraph
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-muted-light italic">$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-semibold">$1</a>')
        }} />
      );
    });
  };

  return (
    <div className="w-full">
      {/* Editor Header: Tabs & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2 pb-2 border-b border-surface-border/60">
        {/* Formatting Toolbar - Only visible in Write mode */}
        <div className={`flex flex-wrap items-center gap-1 bg-surface-card p-1 rounded-xl border border-surface-border/40 ${mode === "preview" ? "opacity-30 pointer-events-none" : ""}`}>
          <button
            type="button"
            onClick={() => insertMarkdown("**", "**")}
            title="Tebalkan (Bold)"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("*", "*")}
            title="Miringkan (Italic)"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("### ")}
            title="Heading"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-surface-border/50 mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("> ")}
            title="Kutipan (Quote)"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("- ")}
            title="Bullet List"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("1. ")}
            title="Numbered List"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("[", "](url)")}
            title="Tautan Link"
            className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>

        {/* Write/Preview Mode Toggle */}
        <div className="flex bg-surface-card p-1 rounded-xl border border-surface-border/40 text-xs ml-auto">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              mode === "write" ? "bg-accent text-surface shadow-sm" : "text-muted-light hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Tulis
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              mode === "preview" ? "bg-accent text-surface shadow-sm" : "text-muted-light hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-y font-mono leading-relaxed"
        />
      ) : (
        <div 
          className="w-full px-4 py-3 bg-surface/40 border border-dashed border-surface-border/80 rounded-xl text-white text-sm min-h-[160px] overflow-y-auto leading-relaxed max-h-[500px]"
          style={{ height: textareaRef.current ? `${textareaRef.current.clientHeight}px` : "200px" }}
        >
          {parseMarkdown(value)}
        </div>
      )}
    </div>
  );
}
