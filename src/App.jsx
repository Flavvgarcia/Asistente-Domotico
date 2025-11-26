import { useState } from "react";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("");

  const iniciarAsistente = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-MX";
    recognition.start();

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      console.log("Usuario dijo:", texto);
      setMensaje(texto);
      procesarComando(texto);
    };
  };

  const procesarComando = (texto) => {
    texto = texto.toLowerCase();

    if (texto.includes("luz") || texto.includes("luces")) {
      alert("OK, encendiendo las luces (simulado)");
    } else if (texto.includes("recordatorio")) {
      alert("Creando un recordatorio (simulado)");
    } else if (texto.includes("emergencia")) {
      alert("⚠ Llamando a emergencia (simulado)");
    } else {
      alert("No entendí ese comando.");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Asistente Domótico</h1>
        <p>Ayuda accesible para adultos mayores</p>
      </header>

      <main className="menu">
        <button className="menu-btn" onClick={iniciarAsistente}>
          🔊 Asistente de Voz
        </button>

        <button className="menu-btn">💡 Control de Luces</button>
        <button className="menu-btn">📅 Recordatorios</button>
        <button className="menu-btn">🚨 Botón de Emergencia</button>
      </main>

      <p style={{ marginTop: "20px", fontSize: "20px" }}>
        Último comando: <strong>{mensaje}</strong>
      </p>

      <footer className="footer">
        <p>Proyecto de Alan & Flavio</p>
      </footer>
    </div>
  );
}

export default App;
