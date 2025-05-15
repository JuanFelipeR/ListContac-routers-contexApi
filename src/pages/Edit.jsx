import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const params = useParams();

  const [inputContact, setInputContact] = useState({ // estado local de contactos, Aquí se guarda la información del contacto que se va a editar.
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => { // se debe renderizar al cargar la seccion de Edit
    const contactToEdit = store.contacts.find( //store.contact es el array donde estan los contactos
      (contact) => contact.id === parseInt(params.id)// .find( condicion para encontrar el objeto)
    );// params.id viene de la URL
    if (contactToEdit) {
      setInputContact({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    }
  }, [params.id, store.contacts]); //dependencias, se renderisa useEffect cada que cambia id o se actualiza la lista

  const handleChange = (e) => {
    const field = e.target.dataset.field;
    const value = e.target.value;
    setInputContact({ ...inputContact, [field]: value });
  };

  async function EditContacts() {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/JuanFelipeR/contacts/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputContact.name,
            phone: inputContact.phone,
            email: inputContact.email,
            address: inputContact.address,
            agenda_slug: "JuanFelipeR",//necesario para actualizar
            id: parseInt(params.id),//necesario para actualizar
          }),
        }
      );

      if (response.ok) {
        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Error updating contact:", errorData);
        alert("Error al actualizar el contacto. Revisa la consola.");
      }
    } catch (error) {
      console.error("Server error contacts:", error);
      alert("Error del servidor. Intenta nuevamente más tarde.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    EditContacts();
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label className="mb-1">Full Name</label>
          <input
            type="text"
            className="form-control mb-3"
            data-field="name"
            value={inputContact.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="container">
          <label className="mb-1">E-mail</label>
          <input
            type="email"
            className="form-control mb-3"
            data-field="email"
            value={inputContact.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="container">
          <label className="mb-1">Phone</label>
          <input
            type="text"
            className="form-control mb-3"
            data-field="phone"
            value={inputContact.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
          />
        </div>
        <div className="container">
          <label className="mb-1">Address</label>
          <input
            type="text"
            className="form-control mb-3"
            data-field="address"
            value={inputContact.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>
        <div className="container mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Save
          </button>
        </div>
        <div className="container mb-3">
          <Link to="/home">
            <span>Back to home</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
