import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Asistente Domótico</h1>
        <p>Ayuda accesible para adultos mayores</p>
      </header>

      <main className="menu">
        <button className="menu-btn">🔊 Asistente de Voz</button>
        <button className="menu-btn">💡 Control de Luces</button>
        <button className="menu-btn">📅 Recordatorios</button>
        <button className="menu-btn">🚨 Botón de Emergencia</button>
      </main>

      <footer className="footer">
        <p>Proyecto de Alan & Flavio</p>
      </footer>
    </div>
  );
}

export default App;
