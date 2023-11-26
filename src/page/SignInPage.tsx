import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { fetchLogin } from '../api/auth';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateBufferToken } from '../api/axios';

const SignInPage: React.FC = () => {
  const signIn = useSignIn();
  const IsAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (IsAuthenticated()) {
    navigate('/')
  }

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await fetchLogin({
        email: values.email,
        password: values.password,
      })
      if (res !== undefined) {
        updateBufferToken('Bearer', res.token)
        signIn({
          token: res.token,
          tokenType: 'Bearer',
          expiresIn: 6,
          authState: {email: values.email},
          refreshToken: res.token,
          refreshTokenExpireIn: 1,
        })
        toast.success("Successfully Login, please wait")
        navigate('/')
      }
    } catch (error: any) {
      toast.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInPage;