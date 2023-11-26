import React, { useState } from 'react';
import { userRequest, userResponse } from '../../types/user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchStoreUser, fetchUpdateUser } from '../../api/v1/user';

interface UserFormProps {
  user?: userResponse;
  handleClose: () => void;
  handleRefresh: () => void;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const type = props.user !== undefined ? 'edit' : 'add';
  const title = props.user !== undefined ? 'Edit User' + props.user.name : 'Add User';
  const initialValues: userRequest = {
    email: props.user?.email ?? '',
    name: props.user?.name ?? '',
    password: '',
  };

  const handleFetchStore = async (payload: userRequest) => {
    const res = await fetchStoreUser(payload);
    if (res !== undefined) {
      props.handleClose();
      props.handleRefresh();
    }
  };

  const handleFetchUpdate = async (payload: userRequest) => {
    const res = await fetchUpdateUser(props.user?.id || 0, payload);
    if (res !== undefined) {
      props.handleClose();
      props.handleRefresh();
    }
  };

  const handleSubmit = (values: userRequest) => {
    if (type === 'add') {
      handleFetchStore(values);
    } else if (type === 'edit') {
      handleFetchUpdate(values);
    }
  };

  const handlePasswordCheckboxChange = () => {
    setPasswordDisabled(!passwordDisabled);
  };

  const validatePassword = (value: string) => {
    let error;
    if (passwordDisabled) {
      return 
    }
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters long';
    }
    return error;
  };

  return (
    <div className="transition w-full">
      <span className="text-xl mb-4">{title}</span>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <div className="flex">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="flex">
              <input
                type="checkbox"
                className="mr-2"
                onChange={handlePasswordCheckboxChange}
              />
              <Field
                type="password"
                id="password"
                name="password"
                placeholder={passwordDisabled ? 'Check left box to change password' : 'Password min length are 8'}
                className={`appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  passwordDisabled ? 'bg-gray-200' : ''
                }`}
                disabled={passwordDisabled}
                validate={validatePassword}
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-slate-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={props.handleClose}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;