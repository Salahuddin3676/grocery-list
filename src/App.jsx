import List from "./components/List";
import Alert from "./components/Alert";
import "./App.css";
import { useEffect, useRef, useState } from "react";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    bgColor: "",
  });

  const inputReference = useRef(null);

  const showAlert = (show, msg, bgColor) => {
    setAlert({ show, msg, bgColor });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter something!", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          } else {
            return item;
          }
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Updated Item!", "success");
    } else {
      setId(id + 1);
      const newItem = { id: id, title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "Item Added!", "success");
    }
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "Item removed!", "success");
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
    inputReference.current.focus();
  };

  const clearAll = () => {
    setList([]);
    showAlert(true, "Empty List!", "danger");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <main>
      <section className="section-center">
        {alert.show && (
          <Alert msg={alert.msg} bgColor={alert.bgColor} setAlert={setAlert} />
        )}

        <h3>Grocery List</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputReference}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Edit" : "Add"}
          </button>
        </form>

        {list.length > 0 && (
          <List
            list={list}
            removeItem={removeItem}
            editItem={editItem}
            clearAll={clearAll}
          />
        )}
      </section>
    </main>
  );
}

export default App;
