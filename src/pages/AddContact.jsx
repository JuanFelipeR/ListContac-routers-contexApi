// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Custom hook for accessing the global state.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()

  const [inputContact, setInputContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const field = e.target.dataset.field; // obtenemos el valor de data-field data-field="fullName"	e.target.dataset.field → "fullNamr"
    const value = e.target.value;
    setInputContact({ ...inputContact, [field]: value });
  };


  async function AddContacts() {

    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/JuanFelipeR/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              "name": inputContact.name,
              "phone": inputContact.phone,
              "email": inputContact.email,
              "address": inputContact.address
            }
          )
        }
      );

      console.log (response)
      if (response.status == 201) {

        navigate("/home")
       
        } 
         
      
      // console.log(data);
    } catch (error) {
      console.error("Server error contacts:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarga de página
    AddContacts()
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label className="mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            className="form-control mb-3"
            data-field="name" // Al utilizar data-field el navegador automáticamente los agrupa en una propiedad especial llamada .dataset del elemento. Esta es una forma estándar del DOM para acceder a datos personalizados.
            value={inputContact.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="container">
          <label className="mb-1" htmlFor="email">
            E-mail
          </label>
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
          <label className="mb-1" htmlFor="phone">
            Phone
          </label>
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
          <label className="mb-1" htmlFor="address">
            Address
          </label>
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
          <button
            type="submit"
            className="btn btn-primary form-control"
            onClick={handleSubmit}
          >
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

// <div className="container">
//   <ul className="list-group">
//     {/* Map over the 'todos' array from the store and render each item as a list element */}
//     {store && store.todos?.map((item) => {
//       return (
//         <li
//           key={item.id}  // React key for list items.
//           className="list-group-item d-flex justify-content-between"
//           style={{ background: item.background }}>

//           {/* Link to the detail page of this todo. */}
//           <Link to={"/single/" + item.id}>Link to: {item.title} </Link>

//           <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>

//           <button className="btn btn-success"
//             onClick={() => dispatch({
//               type: "add_task",
//               payload: { id: item.id, color: '#ffa500' }
//             })}>
//             Change Color
//           </button>
//         </li>
//       );
//     })}
//   </ul>
//   <br />

//   <Link to="/">
//     <button className="btn btn-primary">Back home</button>
//   </Link>
// </div>
