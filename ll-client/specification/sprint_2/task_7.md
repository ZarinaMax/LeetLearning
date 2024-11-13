### Task 7: Enhance Task Object to Include Code Template

#### Overview
In this task, we will enhance the `Task` object to include a `code_template` field that contains a base64-encoded string. This template will be decoded and inserted into the code editor as an example solution for the task.

#### Detailed Steps

1. **Update Backend to Include `code_template` in Task Object**
   - Modify the backend API to include a `code_template` field in the `Task` object.
   - Ensure that the `code_template` is base64-encoded before being sent to the frontend.

2. **Fetch Task Data Including `code_template`**
   - Update the `taskService.js` to fetch the `code_template` along with other task details.
   - Example:
     ```javascript
     import axios from 'axios';
     import config from '../config';

     const API_URL = config.API_URL + '/tasks';

     const getTaskById = (taskId) => {
       return axios.get(`${API_URL}/${taskId}`);
     };

     const taskService = {
       getTaskById,
     };

     export default taskService;
     ```

3. **Decode `code_template` and Insert into Code Editor**
   - Update the `TaskDetail` component to decode the `code_template` and insert it into the code editor.
   - Example:
     ```javascript
     import React, { useEffect, useState } from 'react';
     import { useParams } from 'react-router-dom';
     import taskService from '../services/taskService';
     import CodeEditor from './CodeEditor';

     const TaskDetail = () => {
       const { taskId } = useParams();
       const [task, setTask] = useState(null);
       const [codeTemplate, setCodeTemplate] = useState('');

       useEffect(() => {
         taskService.getTaskById(taskId).then((response) => {
           setTask(response.data);
           const decodedTemplate = atob(response.data.code_template);
           setCodeTemplate(decodedTemplate);
         }).catch((error) => {
           console.error('Error fetching task data', error);
         });
       }, [taskId]);

       if (!task) {
         return <div>Loading...</div>;
       }

       return (
         <div>
           <h1>{task.title}</h1>
           <p>{task.description}</p>
           <CodeEditor initialCode={codeTemplate} />
         </div>
       );
     };

     export default TaskDetail;
     ```

4. **Update Code Editor Component to Accept Initial Code**
   - Modify the `CodeEditor` component to accept an `initialCode` prop and set it as the initial content of the editor.
   - Example:
     ```javascript
     import React, { useEffect, useRef } from 'react';
     import { MonacoEditor } from '@monaco-editor/react';

     const CodeEditor = ({ initialCode }) => {
       const editorRef = useRef(null);

       useEffect(() => {
         if (editorRef.current) {
           editorRef.current.setValue(initialCode);
         }
       }, [initialCode]);

       return (
         <MonacoEditor
           height="400px"
           language="python"
           theme="vs-dark"
           value={initialCode}
           editorDidMount={(editor) => {
             editorRef.current = editor;
           }}
         />
       );
     };

     export default CodeEditor;
     ```

#### Summary
By following these steps, we will enhance the `Task` object to include a `code_template` field, decode it on the frontend, and insert it into the code editor as an example solution for the task.
