export const initialStore = () => {
  return {
    message: null,
    contacts: [], // Almacenamiento de contactos
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "get_contacts": // creacion de usuarios
      return {
        ...store,
        contacts: action.payload, //...store.contacs crea una copia del array de contactos y  action.payload se define como input en la guncion getContac en Home
      };


    default:
      throw Error("Unknown action.");
  }
}
