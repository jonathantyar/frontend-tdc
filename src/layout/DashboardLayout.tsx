import React from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC<any> = ({children}) => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate('/signin')
  }

  return (
    <div>
      <nav className="bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-white font-bold text-lg">Dashboard</h1>
              </div>
            </div>
            <div className="ml-4 flex items-center">
              <div className="ml-3 relative">
                <div className='flex justify-between'>
                  <button className='text-white mr-5'>{auth()?.email}</button>
                  <button className='text-orange-300' onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-screen">{children}</div>
      </main>
    </div>
  )
}

export default DashboardLayout