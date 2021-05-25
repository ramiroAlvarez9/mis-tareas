var fecha_hora = function () {
    var fecha = document.querySelector('.main__header--container--items--h4');
    var hoy = moment().format('LL');
    var fecha_y_hora = fecha.textContent = hoy;
    return fecha_y_hora;
};
var desplegarMenuForm = function () {
    var tareasItems = document.querySelector('.tareas__container');
    var menu = document.querySelector('.iconify-container-menu');
    var menuForm = document.querySelector('#agregar-tarea');
    // este evento hace aparecer el formulario, y elimina las tareas con display:block
    menu.addEventListener('click', function () {
        menuForm.style.transform = 'translateX(0)';
        tareasItems.style.display = 'none';
    });
};
var ocultarMenuForm = function () {
    var tareasItems = document.querySelector('.tareas__container');
    var arrow = document.querySelector('.iconify-container-arrow');
    var menuForm = document.querySelector('#agregar-tarea');
    // este evento hace desaparecer el formulario, y agrega otra vez las tareas con display:block
    arrow.addEventListener('click', function () {
        menuForm.style.transform = 'translateX(-100%)';
        tareasItems.style.display = 'block';
    });
};
var agregarTarea = function () {
    var form = document.querySelector('.form');
    //enviando formulario y guardando en local storage
    form.addEventListener('submit', function (e) {
        var input = document.querySelector('.form__input');
        var select = document.querySelector('.select');
        var tarea = input.value;
        var prioridad = select.value;
        var taskObject = {
            tarea: tarea,
            prioridad: prioridad
        };
        if (localStorage.getItem('tasks') === null) {
            var tareas = [];
            tareas.push(taskObject);
            localStorage.setItem('tasks', JSON.stringify(tareas));
        }
        else {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(taskObject);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        mostrarTareas();
    });
};
var mostrarTareas = function () {
    var tareasLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    var tareasContainer = document.querySelector('.tareas__container');
    for (var i = 0; i < (tareasLocalStorage === null || tareasLocalStorage === void 0 ? void 0 : tareasLocalStorage.length); i++) {
        var tarea = tareasLocalStorage[i].tarea;
        var prioridad = tareasLocalStorage[i].prioridad;
        tareasContainer.innerHTML += "\n    <div class =\"tareas__container--items\">\n            <h6 class =\"tareas__container--title\">" + tarea + "</h6>\n            <div class =\"tareas__container--prioridad\" >prioridad: " + prioridad + "</div>\n            <div class = \"tareas__container--delete\">\n            <a href = \"/\" class = \"tareas__container--delete--button\" onclick = \"eliminarTarea('" + tarea + "')\"><div class=\"iconify\" data-icon=\"el:ok-circle\" data-inline=\"false\" style=\"color:#4957A2; width = \"50\" height = \"50\"></div></a>\n            </div>\n   \n    </div>\n   \n    ";
    }
};
var cantidadDeTareas = function () {
    var numeroDeTareas = document.querySelector('.main__header--container--number--h4');
    var cantidadTareasLocalStorage = JSON.parse(localStorage.getItem('tasks')).length;
    numeroDeTareas.textContent = cantidadTareasLocalStorage;
};
var eliminarTarea = function (tarea) {
    var tareasLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tareasLocalStorage.length; i++) {
        if (tareasLocalStorage[i].tarea === tarea) {
            tareasLocalStorage.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tareasLocalStorage));
};
window.localStorage;
mostrarTareas();
cantidadDeTareas();
fecha_hora();
desplegarMenuForm();
ocultarMenuForm();
agregarTarea();
