import { useState } from 'react';
import { CatsContext } from '../Context/CatsContext';
import { CatContext } from '../types/app';
import { Login } from './Login/Login';

function App() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(1);
  const [updated, setUpdated] = useState(true);
  const [login, setLogin] = useState(false);

  const defaultState: CatContext = {
    id: id,
    setId: setId,
    catUpdateFn: setEdit,
    catUpdate: edit,
    updated: updated,
    setUpdated: setUpdated,
    logined: login,
    setLogined: setLogin,
  };

  return (
    <CatsContext.Provider value={defaultState}>
      <Login />
    </CatsContext.Provider>
  );
}

export default App;
