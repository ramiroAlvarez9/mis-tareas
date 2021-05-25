const fecha_hora = ():string => {

    const fecha:HTMLElement|null = document.querySelector('.main__header--container--items--h4')
    const hoy:string = moment().format('LL'); 
    const fecha_y_hora:string = fecha.textContent = hoy;
    return fecha_y_hora;   
}

const desplegarMenuForm = ():void=> {
    const tareasItems:HTMLElement|null = document.querySelector('.tareas__container')
    const menu:HTMLElement|null = document.querySelector('.iconify-container-menu');
    const menuForm:HTMLElement|null = document.querySelector('#agregar-tarea')
    // este evento hace aparecer el formulario, y elimina las tareas con display:block
    menu.addEventListener('click', ()=> {
        menuForm.style.transform = 'translateX(0)';
        tareasItems.style.display = 'none';
    })
}

const ocultarMenuForm = ():void => {
    const tareasItems:HTMLElement|null = document.querySelector('.tareas__container')
    const arrow:HTMLElement|null = document.querySelector('.iconify-container-arrow');
    const menuForm:HTMLElement|null = document.querySelector('#agregar-tarea');
    // este evento hace desaparecer el formulario, y agrega otra vez las tareas con display:block
    arrow.addEventListener( 'click', () => {
        
        menuForm.style.transform = 'translateX(-100%)'
        tareasItems.style.display = 'block';
        

    })
}

const agregarTarea = ():void => {

    const form:HTMLElement|null = document.querySelector('.form');
    
    //enviando formulario y guardando en local storage
    form.addEventListener('submit', e => {
                                            
        const input = document.querySelector('.form__input') as HTMLInputElement;
        const select = document.querySelector('.select') as HTMLSelectElement;
        
        const tarea:string = input.value;
        const prioridad:string = select.value;

        interface taskObject{
            tarea: string,
            prioridad:string
        }

        let taskObject:taskObject = {
            tarea,
            prioridad,
        }       
    
        if(localStorage.getItem('tasks') === null){
            let tareas:Array<string> = []
            tareas.push(taskObject)
            localStorage.setItem('tasks', JSON.stringify(tareas))
        }else{
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(taskObject);
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }             

        mostrarTareas();
    
    })
}


const mostrarTareas = ():void => {

    let tareasLocalStorage:string|null =JSON.parse(localStorage.getItem('tasks'));

    const tareasContainer:HTMLElement|null = document.querySelector('.tareas__container')


    for(let i:number = 0; i < tareasLocalStorage?.length; i++){
        let tarea:string = tareasLocalStorage[i].tarea;
        let prioridad:string = tareasLocalStorage[i].prioridad;
        
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
const cantidadDeTareas = ():void => {    

    const numeroDeTareas:HTMLElement|null = document.querySelector('.main__header--container--number--h4');
    
    let cantidadTareasLocalStorage:number|null = JSON.parse(localStorage.getItem('tasks')).length;
    numeroDeTareas.textContent = cantidadTareasLocalStorage;
            
}

const eliminarTarea = (tarea):string => {
    let tareasLocalStorage:string|null =JSON.parse(localStorage.getItem('tasks'));

    for(let i:number = 0; i < tareasLocalStorage.length ; i++){

        if(tareasLocalStorage[i].tarea === tarea){

            tareasLocalStorage.splice(i,1);

        }
    }
    localStorage.setItem('tasks', JSON.stringify(tareasLocalStorage));

    
}
window.localStorage;
mostrarTareas();
cantidadDeTareas(); 
fecha_hora();
desplegarMenuForm();
ocultarMenuForm();
agregarTarea();
 

