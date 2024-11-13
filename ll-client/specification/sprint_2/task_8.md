### Task 8: Extend Code Editor to Submit Task Attempt

#### Overview
In this task, we will extend the `CodeEditor` component to include a submit button that allows users to submit their task attempt. The submission will include the task ID and the base64-encoded code.

#### Detailed Steps

1. **Add Submit Button to Code Editor**
   - Update the `CodeEditor` component to include a submit button.
   - Example:
     ```javascript
     import React, { useEffect, useRef, useState } from 'react';
     import { MonacoEditor } from '@monaco-editor/react';
     import { Button } from '@mui/material';
     import attemptService from '../services/attemptService';

     const CodeEditor = ({ initialCode, taskId }) => {
       const editorRef = useRef(null);
       const [code, setCode] = useState(initialCode);

       useEffect(() => {
         if (editorRef.current) {
           editorRef.current.setValue(initialCode);
         }
       }, [initialCode]);

       const handleSubmit = () => {
         const codeValue = editorRef.current.getValue();
         const encodedCode = btoa(codeValue);
         attemptService.submitAttempt(taskId, encodedCode).then((response) => {
           console.log('Submission successful', response);
         }).catch((error) => {
           console.error('Submission error', error);
         });
       };

       return (
         <div>
           <MonacoEditor
             height="400px"
             language="python"
             theme="vs-dark"
             value={code}
             editorDidMount={(editor) => {
               editorRef.current = editor;
             }}
           />
           <Button variant="contained" color="primary" onClick={handleSubmit}>
             Submit
           </Button>
         </div>
       );
     };

     export default CodeEditor;
     ```

2. **Create Attempt Service**
   - Create a new file `attemptService.js` in the `services` folder.
   - Define a function to submit the task attempt to the backend.
   - Example:
     ```javascript
     import axios from 'axios';
     import config from '../config';

     const API_URL = config.API_URL + '/attempts';

     const submitAttempt = (taskId, code) => {
       return axios.post(`${API_URL}`, { taskId, code });
     };

     const attemptService = {
       submitAttempt,
     };

     export default attemptService;
     ```

3. **Update TaskDetail Component to Pass Task ID to Code Editor**
   - Modify the `TaskDetail` component to pass the `taskId` prop to the `CodeEditor` component.
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
           <CodeEditor initialCode={codeTemplate} taskId={taskId} />
         </div>
       );
     };

     export default TaskDetail;
     ```

#### Summary
By following these steps, we will extend the `CodeEditor` component to include a submit button that allows users to submit their task attempt. The submission will include the task ID and the base64-encoded code. This will enable users to submit their solutions and receive feedback from the backend.
