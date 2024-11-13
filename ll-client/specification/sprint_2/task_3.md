### Task 3: Build User Dashboard

#### Overview
In this task, we will create the user dashboard for the LeetLearning platform. The dashboard will display user statistics and progress, and provide access to account settings and personal information. This involves building the dashboard layout, creating components for displaying user data, and implementing forms for updating user information.

#### Detailed Steps

1. **Create Dashboard Component**
   - **Component Creation**:
     - Create a new file `Dashboard.js` in the `components` folder.
     - Define a functional component `Dashboard` that will render the user dashboard.
   - **Layout and Styling**:
     - Use Material-UI components such as `Grid`, `Card`, `Typography`, and `Button` to create a visually appealing layout.
     - Use Tailwind CSS for additional styling and responsiveness.
   - **Fetch User Data**:
     - Use Axios to fetch user statistics and progress from the backend API.
     - Display the fetched data in the dashboard.

2. **Account Settings**
   - **Create Account Settings Section**:
     - Add a section in the `Dashboard` component for users to update their personal information and account settings.
   - **Form Fields**:
     - Use Material-UI components such as `TextField`, `Button`, and `Grid` to create form fields for updating user information (e.g., username, email, password).
   - **Form Validation**:
     - Use `Formik` and `Yup` for form handling and validation.
     - Define validation schema for the account settings form.
   - **Form Submission**:
     - Handle form submission by calling the `userService` to update user data.
     - Display success or error messages based on the API response.

3. **Create User Service**
   - **Create User Service**:
     - Create a new file `userService.js` in the `services` folder.
     - Define functions for fetching user data and updating user information.
     - Example:
       ```javascript
       import axios from 'axios';

       const API_URL = 'http://localhost:5000/api/user';

       const getUserData = () => {
         return axios.get(`${API_URL}/me`, {
           headers: {
             Authorization: `Bearer ${localStorage.getItem('user').token}`,
           },
         });
       };

       const updateUserData = (userData) => {
         return axios.put(`${API_URL}/me`, userData, {
           headers: {
             Authorization: `Bearer ${localStorage.getItem('user').token}`,
           },
         });
       };

       const userService = {
         getUserData,
         updateUserData,
       };

       export default userService;
       ```

#### Detailed Steps Implementation

1. **Create Dashboard Component**

   - **Dashboard.js**:
     ```javascript
     import React, { useEffect, useState } from 'react';
     import { Grid, Card, Typography, Button, Container } from '@mui/material';
     import userService from '../services/userService';

     const Dashboard = () => {
       const [userData, setUserData] = useState(null);

       useEffect(() => {
         userService.getUserData().then((response) => {
           setUserData(response.data);
         }).catch((error) => {
           console.error('Error fetching user data', error);
         });
       }, []);

       if (!userData) {
         return <Typography>Loading...</Typography>;
       }

       return (
         <Container>
           <Typography variant="h4" gutterBottom>
             User Dashboard
           </Typography>
           <Grid container spacing={3}>
             <Grid item xs={12} md={6}>
               <Card>
                 <Typography variant="h6">User Statistics</Typography>
                 <Typography>Username: {userData.username}</Typography>
                 <Typography>Email: {userData.email}</Typography>
                 {/* Add more user statistics here */}
               </Card>
             </Grid>
             <Grid item xs={12} md={6}>
               <Card>
                 <Typography variant="h6">Account Settings</Typography>
                 <AccountSettingsForm userData={userData} />
               </Card>
             </Grid>
           </Grid>
         </Container>
       );
     };

     export default Dashboard;
     ```

2. **Account Settings**

   - **AccountSettingsForm.js**:
     ```javascript
     import React from 'react';
     import { TextField, Button, Grid, Typography } from '@mui/material';
     import { Formik, Form, Field, ErrorMessage } from 'formik';
     import * as Yup from 'yup';
     import userService from '../services/userService';

     const validationSchema = Yup.object({
       username: Yup.string().required('Username is required'),
       email: Yup.string().email('Invalid email format').required('Email is required'),
       password: Yup.string().min(6, 'Password must be at least 6 characters'),
     });

     const AccountSettingsForm = ({ userData }) => {
       const handleSubmit = (values, { setSubmitting, setErrors }) => {
         userService.updateUserData(values).then((response) => {
           // Handle success (e.g., show a success message)
           console.log('Update successful', response);
         }).catch((error) => {
           // Handle error (e.g., show an error message)
           console.error('Update error', error);
           setErrors({ submit: 'Update failed. Please try again.' });
         }).finally(() => {
           setSubmitting(false);
         });
       };

       return (
         <Formik
           initialValues={{ username: userData.username, email: userData.email, password: '' }}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}
         >
           {({ isSubmitting, errors }) => (
             <Form>
               <Field
                 as={TextField}
                 variant="outlined"
                 margin="normal"
                 fullWidth
                 id="username"
                 label="Username"
                 name="username"
                 autoComplete="username"
                 autoFocus
                 helperText={<ErrorMessage name="username" />}
               />
               <Field
                 as={TextField}
                 variant="outlined"
                 margin="normal"
                 fullWidth
                 id="email"
                 label="Email Address"
                 name="email"
                 autoComplete="email"
                 helperText={<ErrorMessage name="email" />}
               />
               <Field
                 as={TextField}
                 variant="outlined"
                 margin="normal"
                 fullWidth
                 name="password"
                 label="Password"
                 type="password"
                 id="password"
                 autoComplete="current-password"
                 helperText={<ErrorMessage name="password" />}
               />
               {errors.submit && (
                 <Typography color="error" variant="body2">
                   {errors.submit}
                 </Typography>
               )}
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 disabled={isSubmitting}
               >
                 Update
               </Button>
             </Form>
           )}
         </Formik>
       );
     };

     export default AccountSettingsForm;
     ```

3. **Create User Service**

   - **userService.js**:
     ```javascript
     import axios from 'axios';

     const API_URL = 'http://localhost:5000/api/user';

     const getUserData = () => {
       return axios.get(`${API_URL}/me`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('user').token}`,
         },
       });
     };

     const updateUserData = (userData) => {
       return axios.put(`${API_URL}/me`, userData, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('user').token}`,
         },
       });
     };

     const userService = {
       getUserData,
       updateUserData,
     };

     export default userService;
     ```

#### Summary
By following these steps, we will implement the user dashboard for the LeetLearning platform. This includes creating the necessary components for displaying user statistics and progress, and implementing forms for updating user information. The dashboard will provide a seamless user experience for managing personal information and tracking progress on the platform.
