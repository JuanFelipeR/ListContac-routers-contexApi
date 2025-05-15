import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  async function getContacts() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/JuanFelipeR",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = await response.json();
      dispatch({ type: "get_contacts", payload: data.contacts });
      console.log(data);
    } catch (error) {
      console.error("Server error contacts:", error);
    }
  }

  useEffect(() => {
    getContacts();
  }, []);

  async function deleteContacts(id) {
    console.log(id);
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/JuanFelipeR/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Asumiendo que la respuesta es un array de contactos
      console.log(response);

      if (response.status == 204) {
        getContacts();
      }
    } catch (error) {
      console.error("Server error contacts:", error);
    }
  }

  return (
<div className="Container d-flex flex-column justify-content-center align-items-center mt-2">
  <div>
  <h1>Lista de Contactos</h1>
  </div>
  <div className="container">
    {store.contacts.length === 0 ? (
      <p>No hay contactos</p>
    ) : (
      <ul className="list-group">
        {store.contacts.map((contact, index) => (
          <li key={index} className="list-group-item d-flex align-items-center gap-3">
            <img
              src="https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg" // Imagen de perfil por defecto
              alt={contact.name}
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div className="flex-grow-1">
              <h5>{contact.name}</h5>
              <p>
                <i className="fas fa-map-marker-alt"></i> {contact.address}
                <br />
                <i className="fas fa-phone-alt"></i> {contact.phone}
                <br />
                <i className="fas fa-envelope"></i> {contact.email}
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary ms-2"
              title="Editar"
              onClick={() => navigate(`/edit/${contact.id}`)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              title="Eliminar"
              onClick={() => deleteContacts(contact.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
  );
};
