import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State'ler
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Sayfa yüklendiğinde, localStorage'dan todoları al
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Todo ekleme fonksiyonu
  const addTodo = () => {
    if (todo.trim() === "") {
      alert("Todo ismi boş olamaz!");
      return;
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Todo silme fonksiyonu
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Tüm todoları silme fonksiyonu
  const clearTodos = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  // Todo güncelleme fonksiyonu
  const updateTodo = (index) => {
    if (editValue.trim() === "") {
      alert("Todo ismi boş olamaz!");
      return;
    }
    const newTodos = [...todos];
    newTodos[index] = editValue;
    setTodos(newTodos);
    setIsEditing(null);
    setEditValue("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Arama filtresi
  const filteredTodos = todos.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">To-Do Uygulaması</h1>

        {/* Yeni todo eklemek için input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Yeni bir todo ekleyin..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="btn btn-primary mt-2 w-100" onClick={addTodo}>
            Todo Ekle
          </button>
        </div>

        {/* Todo arama */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Todoları ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Todo listesi */}
        <ul className="list-group">
          {filteredTodos.map((t, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Eğer düzenleme modundaysak, düzenleme inputu ve kaydet butonu göster */}
              {isEditing === index ? (
                <div className="d-flex w-100 align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => updateTodo(index)} // Input dışına tıklandığında güncellenir
                  />
                  <button
                    className="btn btn-success btn-sm ml-2"
                    onClick={() => updateTodo(index)} // Kaydet butonu
                  >
                    Kaydet
                  </button>
                </div>
              ) : (
                <span>{t}</span> // Düzenleme modunda değilse, sadece todo metnini göster
              )}

              {/* Düzenleme ve Silme butonları, sadece düzenleme modunda değilse gösterilecek */}
              {isEditing !== index && (
                <div className="ml-2">
                  {/* Silme ikonu */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTodo(index)}
                    style={{ marginRight: "5px" }}
                  >
                    Sil
                  </button>

                  {/* Düzenleme ikonu */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      setIsEditing(index); // Düzenleme moduna geç
                      setEditValue(t); // Güncellenen todo'yu input'a yerleştir
                    }}
                    style={{ marginRight: "5px" }}
                  >
                    Düzenle
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Tüm todoları silme */}
        {todos.length > 0 && (
          <button className="btn btn-warning mt-3 w-100" onClick={clearTodos}>
            Tüm Todoları Sil
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
