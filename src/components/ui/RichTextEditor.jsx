"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Quote, List, ListOrdered, Heading3, Link } from "lucide-react";

function markdownToHtml(markdown) {
  if (!markdown) return "";
  
  // If it already contains HTML tags, return it as is
  if (/<[a-z]/i.test(markdown)) {
    return markdown;
  }

  // Convert markdown to HTML line-by-line
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;
  let listType = null; // "ul" or "ol"

  const closeListIfOpen = () => {
    if (inList) {
      html += `</${listType}>`;
      inList = false;
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line === "") {
      closeListIfOpen();
      continue;
    }

    // Bold replacement
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic replacement
    line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Link replacement
    line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Check for headings (e.g. ### Title)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    // Check for blockquotes (e.g. > Quote)
    const quoteMatch = line.match(/^>\s+(.*)/);
    // Check for unordered list (- or *)
    const ulMatch = line.match(/^[-*]\s+(.*)/);
    // Check for ordered list (1. 2. etc)
    const olMatch = line.match(/^\d+\.\s+(.*)/);

    if (headingMatch) {
      closeListIfOpen();
      html += `<h3>${headingMatch[2]}</h3>`;
    } else if (quoteMatch) {
      closeListIfOpen();
      html += `<blockquote>${quoteMatch[1]}</blockquote>`;
    } else if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeListIfOpen();
        html += "<ul>";
        inList = true;
        listType = "ul";
      }
      html += `<li>${ulMatch[1]}</li>`;
    } else if (olMatch) {
      if (!inList || listType !== "ol") {
        closeListIfOpen();
        html += "<ol>";
        inList = true;
        listType = "ol";
      }
      html += `<li>${olMatch[1]}</li>`;
    } else {
      closeListIfOpen();
      html += `<p>${line}</p>`;
    }
  }
  closeListIfOpen();
  
  return html;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis konten di sini...",
  id = "rich-text-editor",
  minHeight = "200px"
}) {
  const editorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync value from parent to contentEditable ONLY if it's different from current editor HTML
  useEffect(() => {
    if (editorRef.current && isMounted) {
      const convertedValue = markdownToHtml(value);
      if (editorRef.current.innerHTML !== convertedValue) {
        editorRef.current.innerHTML = convertedValue;
      }
    }
  }, [value, isMounted]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = prompt("Masukkan URL tautan (misal: https://example.com):");
    if (url) {
      execCmd("createLink", url);
    }
  };

  return (
    <div className="w-full">
      {/* Format Toolbar */}
      <div className="flex flex-wrap items-center gap-1 bg-surface-card p-1.5 rounded-xl border border-surface-border/40 mb-2">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("bold")}
          title="Tebalkan (Bold)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("italic")}
          title="Miringkan (Italic)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("formatBlock", "H3")}
          title="Heading (H3)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-surface-border/50 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("formatBlock", "BLOCKQUOTE")}
          title="Kutipan (Quote)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("insertUnorderedList")}
          title="Daftar Poin (List)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCmd("insertOrderedList")}
          title="Daftar Nomor (Numbered List)"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleLink}
          title="Tautan Link"
          className="p-2 rounded-lg text-muted-light hover:text-white hover:bg-surface transition-all focus:outline-none"
        >
          <Link className="w-4 h-4" />
        </button>
      </div>

      {/* Editor ContentEditable Div */}
      <div className="relative">
        <div
          ref={editorRef}
          id={id}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="w-full px-4 py-3 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 overflow-y-auto outline-none prose prose-invert max-w-none leading-relaxed min-h-[200px]"
          style={{ minHeight }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
