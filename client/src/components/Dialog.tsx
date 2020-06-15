import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Dialog from '@material-ui/core/Dialog';
import DeleteUser from './Dialogs/DeleteUser';
import UpdateUser from './Dialogs/UpdateUser';
import ViewUserDetails from './Dialogs/ViewUserDetails';
import { COUNT, DELETE_USER, UPDATE_USER } from '../queries';
import { IUser, IUpdateUserInputs, DialogType } from '../types';

interface IProps {
  onClose: () => void;
  showDialog: boolean;
  type: DialogType;
  userId: string;
  userData: IUser;
}

const FormDialog: React.FC<IProps> = ({
  onClose,
  showDialog,
  type,
  userId,
  userData
}) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation<{ deleteUser: IUser }>(DELETE_USER, {
    refetchQueries: ['GetUsers'],
    update(cache) {
      try {
        const { count } = cache.readQuery<{ count: number }>({ query: COUNT })!;
        cache.writeQuery({
          query: COUNT,
          data: {
            count: count - 1
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  });

  const onDeleteUser = async () => {
    await deleteUser({ variables: { id: userId } });
    onClose();
  };

  const onUpdateUser = async (input: IUpdateUserInputs) => {
    await updateUser({ variables: { id: userId, input } });
    onClose();
  };

  let template: React.ReactElement | null = null;
  switch (type) {
    case 'view':
      template = <ViewUserDetails onClose={onClose} user={userData} />;
      break;
    case 'update':
      template = (
        <UpdateUser
          onClose={onClose}
          onSubmit={input => onUpdateUser(input)}
          user={userData}
        />
      );
      break;
    case 'delete':
      template = <DeleteUser onClose={onClose} onSubmit={onDeleteUser} />;
      break;
  }

  return (
    <Dialog open={showDialog} onClose={onClose}>
      {template}
    </Dialog>
  );
};

export default FormDialog;
