const url = 'http://localhost:8088/api/usuario'
const listarUsuarios = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)//Permite llamar la API
        .then(res => res.json())
        .then(function (data) {
            let listarUsuarios = data.usuarios
            listarUsuarios.map((usuario) => {
                mensaje += `<tr><td>${usuario.nombre}</td>`+
                `<td>${usuario.apellidos}</td>`+
                `<td>${usuario.correo}</td>`+
                `<td>${usuario.telefono}</td>`+
                `<td>${usuario.rol}</td>`+
                `<td>${usuario.fechacreacion}</td>`+
                `<td>${usuario.estado? 'Activo':'Inactivo' }</td>`+
                `<td>${usuario.contrasena}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal" onclick='editar(${JSON.stringify(usuario)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${usuario._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarUsuarios()

const registrarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let nombre = document.getElementById('nombre').value
    let apellidos = document.getElementById('apellidos').value
    let correo = document.getElementById('correo').value
    let telefono = document.getElementById('telefono').value
    let rol = document.getElementById('rol').value
    let estado = document.getElementById('estado').value
    let contrasena = document.getElementById('contrasena').value

    let usuario = {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        rol: rol,
        estado: estado,
        contrasena: contrasena
    }

    

    // if((password.length >0 && confirmarPassword.length>0) && (password == confirmarPassword)){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }
    // else{
    //     alert('El password y la confirmación del Password no coinciden. Por favor verifique')
    // }


const editar = (usuario) =>{
    document.getElementById('_id').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('apellidos').value = ''
    document.getElementById('correo').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('rol').value = ''
    document.getElementById('estado').value = ''
    document.getElementById('contrasena').value = ''


    document.getElementById('_id').value = usuario._id
    document.getElementById('nombre').value = usuario.nombre
    document.getElementById('apellidos').value = usuario.apellidos
    document.getElementById('correo').value = usuario.correo
    document.getElementById('telefono').value = usuario.telefono
    document.getElementById('rol').value = usuario.rol
    document.getElementById('estado').value = usuario.estado
    document.getElementById('contrasena').value = usuario.contrasena

}

const actualizarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let nombre = document.getElementById('nombre').value
    let apellidos = document.getElementById('apellidos').value
    let correo = document.getElementById('correo').value
    let telefono = document.getElementById('telefono').value
    let rol = document.getElementById('rol').value
    let estado = document.getElementById('estado').value
    let contrasena = document.getElementById('contrasena').value

    let usuario = {
        _id: document.getElementById('_id').value,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        rol: rol,
        estado: estado,
        contrasena: contrasena,
        tipoModificacion: 'Unitaria'
    }

    // if((password.length >0 && confirmarPassword.length>0) && (password == confirmarPassword)){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }
    // else{
    //     alert('El password y la confirmación del Password no coinciden. Por favor verifique')
    // }


const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
            //Captura de valores de datos enviados desde el formulario
    let usuario = {
        _id: _id
    }
    
    //console.log(colegio)

       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrar'))
{
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrarUsuario)
}

if(document.querySelector('#btnActualizar'))
{
    document.querySelector('#btnActualizar')
.addEventListener('click', actualizarUsuario)
}



//Installar en la api(backend) los paquetes:
//cors
//body-parser
