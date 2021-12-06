import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/home-page/homepage.component';
import EmployesPage from './pages/employes-page/employespage.component';
import GroupsPage from './pages/groups-page/groupspage.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponent from './components/navbar/navbar.component';


//Se ACTUALIZA A NUEVA VERSION DE REACT ROUTER DOM V6.0.2
ReactDOM.render(
  <BrowserRouter>
  <NavBarComponent />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="employes" element={<EmployesPage />}/>
      <Route path="groups" element={<GroupsPage />}/>
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
// Para el tema del canActivate pensando solo sin tener autenticacion,
// se insertó el elemento navigate que redireccionará a nuestro elemento raiz (en este caso HomePage)




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
