/* Genera la fecha y hora con moment js, y la inserta dentro de "main__header--container--items--h4". */      
const fechaYHora = () => document.querySelector('.main__header--container--items--h4').textContent = moment().format('LL');
const funcionalidadesDelMenu = ()=> {
  
    const openButtonMenu = document.querySelector('.iconify-container-menu')
    const closeButtonMenu = document.querySelector('.iconify-container-arrow')
    
    // este evento hace aparecer el formulario
    openButtonMenu.addEventListener('click', () => {    
        document.querySelector('#agregar-tarea').style.transform = 'translateX(0)';
    })

    // este evento hace desaparecer el formulario
    closeButtonMenu.addEventListener('click', () => {
        document.querySelector('#agregar-tarea').style.transform = 'translateX(-100%)'    
    })
}
const agregarTarea = () => {
 
    //toma los valores del formulario ".form" y los guarda en localStorage.
    document.querySelector('.form').addEventListener('submit', () => {

        const tarea  = document.querySelector('.form__input').value;
        const prioridad  = document.querySelector('.select').value;

        let taskObject = {
            tarea,
            prioridad,
        }

        if (localStorage.getItem('tasks') === null) {
            let tareas = []
            tareas.push(taskObject)
            localStorage.setItem('tasks', JSON.stringify(tareas))
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(taskObject);
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }

        mostrarTareas();

    })
}

const cantidadDeTareas = () => 
    document.querySelector('.main__header--container--number--h4').textContent = JSON.parse(localStorage.getItem('tasks')).length;

const mostrarTareas = () => {

    let tareasLocalStorage  = JSON.parse(localStorage.getItem('tasks'));

    const tareasContainer = document.querySelector('.tareas__container')

    for (let i  = 0; i < tareasLocalStorage.length; i++) {
        let tarea  = tareasLocalStorage[i].tarea;
        let prioridad = tareasLocalStorage[i].prioridad;

        tareasContainer.innerHTML += `
            <div class ="tareas__container--items">
                    <h6 class ="tareas__container--title">${tarea}</h6>
                    <div class ="tareas__container--prioridad" >prioridad: ${prioridad}</div>
                    <div class = "tareas__container--delete">
                    <a href = "/" class = "tareas__container--delete--button" onclick = "eliminarTarea('${tarea}')"><div class="iconify" data-icon="el:ok-circle" data-inline="false" style="color:#4957A2; width = "50" height = "50"></div></a>
                </div>
            </div>
    `
    }
}
const eliminarTarea = tarea  => {
    let tareasLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tareasLocalStorage.length; i++) {

        if (tareasLocalStorage[i].tarea === tarea) {
            tareasLocalStorage.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tareasLocalStorage));
}

fechaYHora();
funcionalidadesDelMenu();
agregarTarea();
mostrarTareas();
cantidadDeTareas();

