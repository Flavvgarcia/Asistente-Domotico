import { useState } from "react";
import "./App.css";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [mensaje, setMensaje] = useState("");

  const iniciarAsistente = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-MX";
    recognition.start();

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      setMensaje(texto);
      procesarComando(texto);
    };
  };

  const procesarComando = (texto) => {
    texto = texto.toLowerCase();

    if (texto.includes("luz") || texto.includes("luces")) {
      setPantalla("luces");
    } else if (texto.includes("recordatorio")) {
      setPantalla("recordatorios");
    } else if (texto.includes("emergencia")) {
      setPantalla("emergencia");
    } else {
      alert("No entendí ese comando.");
    }
  };

  const volverInicio = () => setPantalla("inicio");

  return (
    <div className="app-container">
      <header className="header">
        <h1>Asistente Domótico</h1>
        <p>Ayuda accesible para adultos mayores</p>
      </header>

      {/* ======================
          PANTALLA PRINCIPAL
      ====================== */}
      {pantalla === "inicio" && (
        <main>
          <button className="assistant-btn" onClick={iniciarAsistente}>
            🔊 Activar Asistente de Voz
          </button>

          <button className="btn-grande" onClick={() => setPantalla("luces")}>
            💡 Control de Luces
          </button>

          <button
            className="btn-grande"
            onClick={() => setPantalla("recordatorios")}
          >
            📅 Recordatorios
          </button>

          <button
            className="btn-grande rojo"
            onClick={() => setPantalla("emergencia")}
          >
            🚨 Botón de Emergencia
          </button>
        </main>
      )}

      {/* ======================
          PANTALLA LUCES
      ====================== */}
      {pantalla === "luces" && (
        <div className="pantalla">
          <h2>💡 Control de Luces</h2>
          <p>Simulación de encendido y apagado</p>

          <button className="btn-grande">Encender luces</button>
          <button className="btn-grande">Apagar luces</button>

          <button className="btn-grande rojo" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

      {/* ======================
          PANTALLA RECORDATORIOS
      ====================== */}
      {pantalla === "recordatorios" && (
        <div className="pantalla">
          <h2>📅 Recordatorios</h2>
          <p>Aquí puedes crear recordatorios simulados</p>

          <button className="btn-grande">Agregar recordatorio</button>
          <button className="btn-grande">Ver recordatorios</button>

          <button className="btn-grande rojo" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

      {/* ======================
          PANTALLA EMERGENCIA
      ====================== */}
      {pantalla === "emergencia" && (
        <div className="pantalla">
          <h2>🚨 Emergencia</h2>
          <p>Simulación de llamada de emergencia</p>

          <button className="btn-grande rojo">📞 Llamar a emergencias</button>

          <button className="btn-grande" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

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
