import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SignInPage from './page/SignInPage';
import UserPage from './page/UserPage/UserPage';
import { RequireAuth } from 'react-auth-kit'
import DashboardLayout from './layout/DashboardLayout';

import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';

const App: React.FC = () => {
  return (
    <div className='bg-slate-200'>
      <Routes>
        <Route path={'/'} element={
          <RequireAuth loginPath='/signin'>
            <DashboardLayout>
              <UserPage />
            </DashboardLayout>
          </RequireAuth>
        }/>
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
