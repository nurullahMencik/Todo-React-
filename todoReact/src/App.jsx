import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State'ler
  const [todos, setTodos] = useState([]); // Todo'ları tutan state
  const [todo, setTodo] = useState(""); // Yeni todo'nun değeri
  const [search, setSearch] = useState(""); // Arama terimi
  const [isEditing, setIsEditing] = useState(null); // Güncellemeye başlanan todo
  const [editValue, setEditValue] = useState(""); // Güncellenmiş todo'nun değeri

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
    const newTodos = [...todos, todo]; // Yeni todo ekle
    setTodos(newTodos); // State'i güncelle
    setTodo(""); // Input'u temizle
    localStorage.setItem("todos", JSON.stringify(newTodos)); // LocalStorage'a kaydet
  };

  // Todo silme fonksiyonu
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index); // Silinen todo'yu filtrele
    setTodos(newTodos); // State'i güncelle
    localStorage.setItem("todos", JSON.stringify(newTodos)); // LocalStorage'ı güncelle
  };

  // Tüm todoları silme fonksiyonu
  const clearTodos = () => {
    setTodos([]); // Tüm todoları state'ten sil
    localStorage.removeItem("todos"); // LocalStorage'dan tüm veriyi sil
  };

  // Todo güncelleme fonksiyonu
  const updateTodo = (index) => {
    if (editValue.trim() === "") {
      alert("Todo ismi boş olamaz!");
      return;
    }
    const newTodos = [...todos];
    newTodos[index] = editValue; // Todo'yu yeni değerle güncelle
    setTodos(newTodos); // State'i güncelle
    setIsEditing(null); // Düzenleme modundan çık
    setEditValue(""); // Input'u temizle
    localStorage.setItem("todos", JSON.stringify(newTodos)); // LocalStorage'ı güncelle
  };

  // Arama filtresi
  const filteredTodos = todos.filter(
    (t) => t.toLowerCase().includes(search.toLowerCase()) // Arama terimine göre todo'ları filtrele
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
            onChange={(e) => setTodo(e.target.value)} // Input değeri değiştiğinde state'i güncelle
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
            onChange={(e) => setSearch(e.target.value)} // Arama değeri değiştiğinde state'i güncelle
          />
        </div>

        {/* Todo listesi */}
        <ul className="list-group">
          {filteredTodos.map((t, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Eğer düzenleme modundaysak, düzenleme inputu göster */}
              {isEditing === index ? (
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="form-control"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)} // Düzenlenen değeri güncelle
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

              {/* Silme ve Düzenleme ikonlarını grupla */}
              <div>
                {/* Silme ikonu */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTodo(index)} // Silme butonuna tıklayınca todo silinir
                  style={{ marginRight: "5px" }} // Silme ve düzenleme arasına 5px boşluk
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
                  style={{ marginRight: "5px" }} // Silme ve düzenleme arasına 5px boşluk
                >
                  Düzenle
                </button>
              </div>
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
