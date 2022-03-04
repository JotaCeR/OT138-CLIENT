import React, { useEffect } from "react";
import Home from "./components/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Form_contact";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Backoffice from "./views/Backoffice";
import Profile from "./views/Profile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkAuthentication as checkAuthenticationAction } from "./actions/authActions";
import Protected from "./components/Routes/Protected";
import Activities from "./views/Activities";
import { ActivitiesByID } from "./views/Activities";
import ActivityEditor from './views/BackOffice/ActivityEditor';
import NewsEditor from './views/BackOffice/NewsEditor';
import EditForm from "./views/EditForm";
import News, { NewsByID } from "./views/News";

function App({ checkAuthentication }) {
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<FormContacto />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/actividades" element={<Activities />} />
        <Route path="/actividades/:id" element={<ActivitiesByID />} />
        <Route path="/novedades" element={<News />} />
        <Route path="/novedades/:id" element={<NewsByID />} />
        <Route path="/form-edition" element={<EditForm />} />
        <Route
          path="/backoffice/*"
          element={
            <Protected isAdmin>
              <Backoffice />
            </Protected>
          }
        />
        <Route path="/backoffice/actividades/nueva" element={
          <Protected isAdmin>
            <ActivityEditor />
          </Protected>
        }
        />
        <Route path="/backoffice/actividades/editar/:id" element={
          <Protected isAdmin>
            <ActivityEditor />
          </Protected>
        } />
        <Route path="/backoffice/novedades/nueva" element={
          <Protected isAdmin>
            <NewsEditor />
          </Protected>
        }
        />
        <Route path="/backoffice/novedades/editar/:id" element={
          <Protected isAdmin>
            <NewsEditor />
          </Protected>
        } />
      </Routes>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkAuthentication: checkAuthenticationAction,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(App);
