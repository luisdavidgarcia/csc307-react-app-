import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {


  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
    });
    setCharacters(updated);
    const userToDelete = characters.filter((character, i) => {
        return i === index
    })
    makeDeleteCall(userToDelete[0].id);
    //.then( result => {
    //  if (result.status === 204)
     // {
    //    const updated = characters.filter((character, i) => {
    //      return i !== index
    //    });
    //    setCharacters(updated);
     // }

    //} ); //delete users on backend
  }

  function updateList(person) {
   makePostCall(person).then( result => {
   if (result && result.status === 201)
     {
      const newUserData = result.data; // get ID too
      setCharacters([...characters, newUserData] );
     }
   });
  }

  async function makeDeleteCall(id){
    try {
      console.log("Delete Call");
      console.log(id);
      axios.delete(`http://localhost:8000/users/${id}`);
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data.users_list;
    }
    catch (error) {
      // for now just log errors
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person){
   try {
      const response = await axios.post('http://localhost:8000/users', person);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );

}

export default MyApp;

