import { useState } from "react";
import "./App.css";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [mensaje, setMensaje] = useState("");
  const [notif, setNotif] = useState("");
  const [escuchando, setEscuchando] = useState(false);

  const mostrarNotificacion = (texto) => {
    setNotif(texto);
    setTimeout(() => setNotif(""), 2200);
  };

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
    setEscuchando(true);

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      setMensaje(texto);
      procesarComando(texto);
      setEscuchando(false);
    };

    recognition.onerror = () => setEscuchando(false);
  };

  const procesarComando = (texto) => {
    texto = texto.toLowerCase();

    if (texto.includes("luz") || texto.includes("luces")) {
      mostrarNotificacion("Encendiendo luces… (simulado)");
      setPantalla("luces");
    } else if (texto.includes("recordatorio")) {
      mostrarNotificacion("Abriendo recordatorios…");
      setPantalla("recordatorios");
    } else if (texto.includes("emergencia")) {
      mostrarNotificacion("Iniciando llamada de emergencia…");
      setPantalla("emergencia");
    } else {
      mostrarNotificacion("No entendí ese comando.");
    }
  };

  const volverInicio = () => setPantalla("inicio");

  return (
    <div className="app-container">
      <header className="header">
        <h1>Asistente Domótico</h1>
        <p>Ayuda accesible para adultos mayores</p>
      </header>

      {/* Indicador visual de que está escuchando */}
      {escuchando && (
        <div className="escuchando">
          🎤 Escuchando…
        </div>
      )}

      {/* Notificación */}
      {notif && <div className="notificacion">{notif}</div>}

      {/* ================= INICIO ================= */}
      {pantalla === "inicio" && (
        <main className="contenido">
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

          <button className="btn-grande rojo" onClick={() => setPantalla("emergencia")}>
            🚨 Botón de Emergencia
          </button>
        </main>
      )}

      {/* ============== LUCES ============== */}
      {pantalla === "luces" && (
        <div className="pantalla">
          <h2>💡 Control de Luces</h2>
          <p>Simulación de encendido y apagado</p>

          <button className="btn-grande" onClick={() => mostrarNotificacion("Luces encendidas ✓")}>
            Encender luces
          </button>

          <button className="btn-grande" onClick={() => mostrarNotificacion("Luces apagadas ✓")}>
            Apagar luces
          </button>

          <button className="btn-grande rojo" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

      {/* ============== RECORDATORIOS ============== */}
      {pantalla === "recordatorios" && (
        <div className="pantalla">
          <h2>📅 Recordatorios</h2>
          <p>Aquí puedes crear recordatorios simulados</p>

          <button className="btn-grande" onClick={() => mostrarNotificacion("Recordatorio agregado ✓")}>
            Agregar recordatorio
          </button>

          <button className="btn-grande" onClick={() => mostrarNotificacion("Mostrando recordatorios…")}>
            Ver recordatorios
          </button>

          <button className="btn-grande rojo" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

      {/* ============== EMERGENCIA ============== */}
      {pantalla === "emergencia" && (
        <div className="pantalla">
          <h2>🚨 Emergencia</h2>
          <p>Simulación de llamada de emergencia</p>

          <button
            className="btn-grande rojo"
            onClick={() => mostrarNotificacion("Llamando a emergencias…")}
          >
            📞 Llamar a emergencias
          </button>

          <button className="btn-grande" onClick={volverInicio}>
            ⬅ Volver
          </button>
        </div>
      )}

      <p className="ultimo-comando">
        Último comando: <strong>{mensaje}</strong>
      </p>

      <footer className="footer">
        <p>Proyecto de Flavio</p>
      </footer>
    </div>
  );
}

export default App;