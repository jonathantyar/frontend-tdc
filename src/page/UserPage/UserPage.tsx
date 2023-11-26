import React, { useEffect, useState } from 'react';
import { userResponse } from '../../types/user';
import { fetchDestroyUser, fetchListUser } from '../../api/v1/user';
import { toast } from 'react-toastify';
import { convertRFC3339ToDate } from '../../helper/formatDate';
import { confirmAlert } from 'react-confirm-alert';
import { Modal } from 'react-responsive-modal';
import UserForm from './UserForm';

const UserPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [userList, setUserList] = useState<userResponse[]>([])
  const [selectedUser, setSelecteduser] = useState<userResponse>()

  const handleFetchUser = async () => {
    try {
      const res= await fetchListUser();
      if (res !== undefined) {
        setUserList(res);
      }
    } catch (error:any) {
      toast.error(error)
    }
  };

  const handleFetchDelete = async (id: number) => {
    try {
      await fetchDestroyUser(id) 
      await handleFetchUser()
    } catch (error:any) {
      toast.error(error)
    }
  }

  useEffect(() => {
    handleFetchUser();

    return () => {
    };
  }, []); 

  const handleEditButton = (user: userResponse) => {
    setSelecteduser(user)
    onOpenModal()
  }

  const handleConfirmDeleteButton = async (id: number) => {
    try {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => await handleFetchDelete(id),
          },
          {
            label: 'No',
          }
        ]
      });
    } catch (error: any) {
      toast.error(error)
    }
  }


  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <UserForm user={selectedUser} handleClose={onCloseModal} handleRefresh={handleFetchUser} />
      </Modal>

      <div className="container mx-auto p-4 relative">
        <h2 className="text-xl mb-4">User List</h2>
        <button className='absolute right-5 bg-sky-300 hover:bg-sky-400 py-2 px-4 rounded top-1 transition' onClick={onOpenModal}>Add New</button>
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className='text-center'>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b text-left">{user.email}</td>
                <td className="py-2 px-4 border-b">{convertRFC3339ToDate(user.created_at)}</td>
                <td className="py-2 px-4 border-b">
                  <button className='bg-gray-300 hover:bg-gray-400 py-2 px-4 mr-2 rounded transition' onClick={() => handleEditButton(user)}>Edit</button>
                  <button className='bg-rose-200 hover:bg-rose-300 py-2 px-4 mr-2 rounded transition' onClick={() => handleConfirmDeleteButton(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserPage