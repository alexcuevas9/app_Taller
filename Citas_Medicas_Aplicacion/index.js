class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}

class UI {
    constructor() {
        this.citasList = document.getElementById('citas');
    }

    mostrarCitas(citas) {
        this.limpiarHTML();

        citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('cita');

            divCita.innerHTML = `
                <p>Paciente: <span>${cita.paciente}</span></p>
                <p>Fecha: <span>${cita.fecha}</span></p>
                <p>Hora: <span>${cita.hora}</span></p>
                <p>Especialista: <span>${cita.especialista}</span></p>
                <button class="btn btn-danger" data-id="${cita.id}">Eliminar</button>
            `;

            this.citasList.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while (this.citasList.firstChild) {
            this.citasList.removeChild(this.citasList.firstChild);
        }
    }

    mostrarAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert', `alert-${tipo}`);
        divMensaje.textContent = mensaje;

        const container = document.querySelector('.container');
        container.insertBefore(divMensaje, document.querySelector('#app'));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

const citas = new Citas();
const ui = new UI();

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    let paciente = document.getElementById('paciente').value;
    let  fecha = document.getElementById('fecha').value;
    let  hora = document.getElementById('hora').value;
    let  especialista = document.getElementById('especialista').value;

    // lo  de  disponibilidad de la cita
    let citaExistente = citas.citas.find(function (cita) {
        return cita.fecha === fecha && cita.hora === hora;
    });
    if (citaExistente) {
        ui.mostrarAlerta('La fecha y hora seleccionadas ya están ocupadas, seleccione otra fecha', 'danger');
        return; 
    }

    let cita = {
        paciente: paciente,
        fecha: fecha,
        hora: hora,
        especialista: especialista,
        id: Date.now()
    };

    citas.agregarCita(cita);
    ui.mostrarAlerta('Cita agregada correctamente', 'success');
    ui.mostrarCitas(citas.citas);

    // Limpiar losformulario 
    document.getElementById('paciente').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('especialista').value = '';
});

const especialistasInfo = {
    "Dr. Cuevas": {
        nombre: "Dr. Juan Cuevas",
        especialidad: "Cardiología",
        horario: "Lunes a Viernes: 8am - 5pm",
        direccion: "Centro comercial viva"
    },
    "Dra. Maria": {
        nombre: "Dra. Maria González",
        especialidad: "Pediatría",
        horario: "Lunes a Viernes: 9am - 6pm",
        direccion: "Avenida las ameriacas #456"
    },
    "Dr. Castro": {
        nombre: "Dr. Roberto Castro",
        especialidad: "Dermatología",
        horario: "Lunes a Viernes: 10am - 7pm",
        direccion: "Carrera 7 con 20a"
    }
};
//
document.getElementById('especialista').addEventListener('change', function () {
    const especialistaSeleccionado = this.value;
    const infoEspecialista = especialistasInfo[especialistaSeleccionado];

    const mensajeEspecialista = document.getElementById('mensaje-especialista');

    if (infoEspecialista) {
        mensajeEspecialista.innerHTML = `
            <p>Nombre: ${infoEspecialista.nombre}</p>
            <p>Especialidad: ${infoEspecialista.especialidad}</p>
            <p>Horario: ${infoEspecialista.horario}</p>
            <p>Dirección: ${infoEspecialista.direccion}</p>
            <button class="btn-cerrar" onclick="cerrarMensajeEspecialista()">Cerrar</button>
        `;
        mensajeEspecialista.style.display = 'block'; // Mostrar el mensaje
    } else {
        mensajeEspecialista.innerHTML = 'No se encontró información para este especialista';
        mensajeEspecialista.style.display = 'block'; // Mostrar el mensaje
        
    }
    
});
function cerrarMensajeEspecialista() {
    document.getElementById('mensaje-especialista').style.display = 'none';
}
document.getElementById('citas').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-danger')) {
        const id = parseInt(e.target.dataset.id);
        citas.eliminarCita(id);
        ui.mostrarAlerta('Cita eliminada correctamente', 'danger');
        ui.mostrarCitas(citas.citas);
    }
});

