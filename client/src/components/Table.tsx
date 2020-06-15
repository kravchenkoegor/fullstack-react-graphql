import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IUser } from '../types';

interface IProps {
  count: number;
  users: IUser[];
  deleteUser: (id: string) => void;
  updateUser: (id: string) => void;
  viewUserDetails: (id: string) => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (_: any, newPage: number) => void;
  handleChangeRowsPerPage: (rowsPerPage: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderRadius: '50%',
      marginRight: theme.spacing(2)
    },
    iconButton: {
      padding: theme.spacing(1),
      transition: 'color .2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    },
    link: {
      alignItems: 'center',
      color: 'inherit',
      display: 'flex',
      textDecoration: 'none',
      transition: 'color .2s ease-in-out',
      width: '100%',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    },
    table: {
      display: 'flex',
      flexDirection: 'column'
    },
    'table__body': {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '100%'
    },
    'table__row': {
      display: 'flex',
      width: '100%'
    },
    'table__col': {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      minWidth: 'calc((100% - 160px) / 2)'
    },
    'table__col_actions': {
      minWidth: 160
    },
    'table__col_head': {
      fontWeight: 700
    },
    title: {
      fontWeight: 700,
      textDecoration: 'none'
    }
  })
);

const DataTable: React.FC<IProps> = props => {
  const {
    count,
    users,
    deleteUser,
    updateUser,
    viewUserDetails,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;

  if (!users.length) {
    handleChangePage(null, 0);
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table component="div" className={classes.table}>
        <TableHead component="div" className={classes.table__row}>
          <TableRow component="div" className={classes.table__row}>
            <TableCell
              component="div"
              className={`${classes.table__col} ${classes.table__col_head}`}
            >
              Name
            </TableCell>
            <TableCell
              component="div"
              className={`${classes.table__col} ${classes.table__col_head}`}
            >
              Email
            </TableCell>
            <TableCell component="div" className={classes.table__col_actions} />
          </TableRow>
        </TableHead>
        <TableBody component="div" className={classes.table__body}>
          {users.map(user => (
            <TableRow component="div" key={user.id} className={classes.table__row}>
              <TableCell component="div" className={classes.table__col}>
                <Link to={`/user/${user.id}`} className={classes.link}>
                  <img width={40} height={40} src={user.avatar} className={classes.avatar} alt="" />
                  <span className={classes.title}>{user.name}</span>
                </Link>
              </TableCell>
              <TableCell component="div" className={classes.table__col}>
                {user.email}
              </TableCell>
              <TableCell component="div" className={classes.table__col_actions}>
                <IconButton onClick={() => viewUserDetails(user.id)} className={classes.iconButton}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => updateUser(user.id)} className={classes.iconButton}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteUser(user.id)} className={classes.iconButton}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(Number(e.target.value))
        }
      />
    </TableContainer>
  );
};

export default DataTable;
