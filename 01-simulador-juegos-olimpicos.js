const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Participant {
  constructor() {
    this.name = "";
    this.country = "";
    this.event = "";
  }
}

class Olympics {
  constructor() {
    this.events = [];
    this.participants = [];
    this.results = [];
  }

  registerEvent(callback) {
    rl.question("Ingrese el nombre del evento: ", (event) => {
      let nameEvent = {
        name: event,
        winners: []
      }
      if (this.events.find(e => e.name === event)) {
        console.log(`El evento "${event}" ya existe.`);
        callback();
        return;
      }
      this.events.push(nameEvent);
      console.log(`Evento "${event}" registrado correctamente.`);
      console.log("Estos son todos los eventos:");
      this.events.forEach((e,i) => console.log(`${i + 1}. ${e.name}`));

      callback();
    });
  }

  registerParticipant(callback) {
    if (this.events.length >= 1) {

      rl.question("Ingrese el nombre del participante: ", (name) => {
        name = name;
        rl.question("Ingrese el país del participante: ", (country) => {
          country = country;
          rl.question("Ingrese el evento al que se inscribe el participante: ", (event) => {
            event = event;
            let participant = new Participant();
            participant.name = name;
            participant.country = country;
            participant.event = event;
            this.participants.push(participant);
            console.log(`Participante "${name}" registrado correctamente.`);
            console.log("Estos son todos los participantes:");
            this.participants.forEach((p,i) => console.log(`${i + 1}. ${p.name}`));

            callback();
          })
        })
      })
    } else {
      console.log("No hay eventos registrados.");
      callback();
    }
  }

}

console.log("🎮 Simulador de Juegos Olímpicos");

const olympics = new Olympics();

function mostrarMenu() {
  console.log("\nMenú:");
  console.log("1. Registro de eventos");
  console.log("2. Registro de participantes");
  console.log("3. Simulación de eventos");
  console.log("4. Creación de informes");
  console.log("5. Salir");

  rl.question("Seleccione una opción: ", (option) => {
    switch (option) {
      case "1":
        console.log("📝 Registro de eventos");
        olympics.registerEvent(mostrarMenu);
        break;
      case "2":
        console.log("👥 Registro de participantes");
        olympics.registerParticipant(mostrarMenu);
        break;
      case "3":
        console.log("🏅 Simulación de eventos");
        break;
      case "4":
        console.log("📊 Creación de informes");
        break;
      case "5":
        console.log("👋 Saliendo...");
        rl.close();
        return;
      default:
        console.log("❌ Opción inválida");
        break;
    }

    // Mostrar el menú nuevamente
    mostrarMenu();
  });
}

// Iniciar el menú
mostrarMenu();
