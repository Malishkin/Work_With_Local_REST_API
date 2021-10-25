import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';

function DataTableComponent() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      Firstname: 'Avi',
      Lastname: 'Cohen',
      Phonenumber: '0543372339',
    },
    {
      Firstname: 'Ron',
      Lastname: 'Gutman',
      Phonenumber: '0507668991',
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('UseEffect is called 3!');
        const response = await axios('http://localhost:8000/api/users');
        let updatedUsers = [];
        updatedUsers.push(users[0]);
        updatedUsers.push(users[1]);
        response.data && updatedUsers.push(response.data.Data);
        setUsers(updatedUsers);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
    fetchData();
  }, []);

  const columns = [
    {
      Header: 'First name',
      accessor: 'Firstname',
    },
    {
      Header: 'Last name',
      accessor: 'Lastname',
    },
    {
      Header: 'Phone number',
      accessor: 'Phonenumber',
    },
  ];

  const customSubmit = async (e) => {
    e.preventDefault();
    let userData = {
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      Phonenumber: user.Phonenumber,
    };
    let response = await axios.post(
      'http://localhost:8000/api/users',
      userData
    );
    alert(response.data);
    return response.data.Success;
  };

  return (
    <>
      {users && <Table data={users} columns={columns} />}
      <h1 className='large text-primary'>Update Yossi</h1>
      <form className='form' onSubmit={(e) => customSubmit(e)}>
        <div className='form-group'>
          First Name: &nbsp; &nbsp;{' '}
          <input
            type='text'
            value={users.Firstname}
            onChange={(e) => setUser({ ...user, Firstname: e.target.value })}
          />
        </div>
        <div className='form-group'>
          Last Name: &nbsp;{' '}
          <input
            type='text'
            value={users.Lastname}
            onChange={(e) => setUser({ ...user, Lastname: e.target.value })}
          />
        </div>
        <div className='form-group'>
          Phone Number:{' '}
          <input
            type='text'
            value={users.Phonenumber}
            onChange={(e) => setUser({ ...user, Phonenumber: e.target.value })}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Save Data' />
        &nbsp;
      </form>
    </>
  );
}

export default DataTableComponent;
