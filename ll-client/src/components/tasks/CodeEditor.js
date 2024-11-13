// src/components/tasks/CodeEditor.js
import React, { useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ initialCode, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
  }, [initialCode]);

  const handleEditorChange = (value) => {
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  return (
    <div style={{ height: "90vh", border: "1px solid #ddd" }}>
      <Editor
        height="100%"
        language="python"
        theme="light"
        value={initialCode}
        onChange={handleEditorChange}
        editorDidMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default CodeEditor;
