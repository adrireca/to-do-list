function crearTarea(e) {
    e.preventDefault();

    var formulario = document.querySelector(".form-add");

    formulario.addEventListener('submit', () => {
        var titulo = document.getElementById('add').value;

        if (titulo.length >= 1) {
            localStorage.setItem(titulo, titulo);
            document.getElementById("add").value = "";
        }
    });

    leer_mostrar();

    let borrar = document.querySelector(".list-group");
    borrar.addEventListener("click",eliminarTarea,false);

    let buscar = document.getElementById("search");
    buscar.addEventListener("keyup",buscarTarea,false);

}





function leer_mostrar() {
    var ul = document.querySelector('.list-group');
    for (var i in localStorage) {
        if(typeof localStorage[i] == 'string'){
            let plantilla = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${localStorage[i]}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
    
        ul.innerHTML += plantilla;
        }

    }

}





function eliminarTarea(e) {
    let valorTarea = e.target.parentElement.children[0].innerText;
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        localStorage.removeItem(valorTarea,valorTarea);
    }

}





function buscarTarea(){
    let buscar = document.getElementById("search");
    
    let buscarUsuario = buscar.value.trim().toLowerCase();
    
    compararTarea(buscarUsuario);
}





function compararTarea(buscarUsuario){
    let lista = document.querySelector(".list-group");
    Array.from(lista.children)
        .filter(task => !task.textContent.toLowerCase().includes(buscarUsuario))
        .forEach(filteredTask => {
            filteredTask.classList.add('ocultarTarea');
            filteredTask.classList.remove('d-flex');
        });

    Array.from(lista.children)
        .filter(task => task.textContent.toLowerCase().includes(buscarUsuario))
        .forEach(filteredTask => {
            filteredTask.classList.remove('ocultarTarea');
            filteredTask.classList.add('d-flex');
        });

}




window.addEventListener("load", crearTarea, false);