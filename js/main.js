class Prestamos {
    constructor(tipo, moneda, monto, cantCuotas) {
        this.tipo = tipo;
        this.moneda = moneda;
        this.monto = monto;
        this.cantCuotas = cantCuotas;
    }
}

let arrayprestamos = []
let prestamosCargados = []
let totalAPagar = 0
let usuario = localStorage.getItem('usuario')

//Funciones

function Bienvenida() {
    let nombre = prompt("Ingrese su nombre")
    alert("Bienvenid@ " + nombre + " al simulador de prestamos, a continuacion podra escojer los tipos de prestamo");
}

function cargarPrestamos() {

    let tipo = prompt("Ingrese una opcion: \n 1: Simular Prestamo Automotor \n 2: Simular Prestamo Inmobiliario \n 3: Informe de Prestamos \n 4: Finalizar");

    //creamos nueva instancia de prestamos con los valores obtenidos por el usuario

    if (tipo === "1") {
        tipo = "Automotor"
    }
    else if (tipo === "2") {
        tipo = "Inmobiliario"
    }
    else if (tipo === "3") {
        mostrarListadoPrestamos()
    }
    else if (tipo === "4") {
        alert("Gracias por su Visita!");
    }

    if (tipo === "Automotor" || tipo === "Inmobiliario") {
        let moneda = prompt("Ingrese la moneda para el prestamo \n 1: Dolares \n 2: Pesos")
        let monto = prompt("Ingrese el monto")
        let cantCuotas = prompt("Ingrese la cantidad de cuotas")

        if (moneda === "1") {
            moneda = "Dolares"
        }
        else if (moneda === "2") {
            moneda = "Pesos"
        }

        const nuevoPrestamo = new Prestamos(tipo, moneda, monto, cantCuotas)
        alert(" Eligio: \n" + " Prestamo: " + nuevoPrestamo.tipo + "\n Moneda: " + nuevoPrestamo.moneda + "\n Monto: " + nuevoPrestamo.monto + "\n Cantidad de Cuotas: " + nuevoPrestamo.cantCuotas);
        arrayprestamos.push(nuevoPrestamo)

        if (nuevoPrestamo.tipo === "Automotor") {
            prestamoAutomotor()
        }
        else if (nuevoPrestamo.tipo === "Inmobiliario") {
            prestamoInmobiliario()
        }
    }
}


//Con HTML
function HTMLcargarPrestamos() {
    //Obtengo valores ingresados por el usuario
    let nombreusUario = document.getElementById('formusuario').value
    let tipo = document.getElementById('formTipos').value
    let moneda = document.getElementById('formMonedas').value
    let monto = document.getElementById('formMonto').value
    let cantCuotas = document.getElementById('formCuotas').value

    

    if (tipo === "0") {
        tipo = "Automotor"
    }
    else if (tipo === "1") {
        tipo = "Inmobiliario"
    }

    console.log(tipo)

    if (tipo === "Automotor" || tipo === "Inmobiliario") {

        //let moneda = prompt("Ingrese la moneda para el prestamo \n 1: Dolares \n 2: Pesos")
        //let monto = prompt("Ingrese el monto")
        //let cantCuotas = prompt("Ingrese la cantidad de cuotas") 

        if (moneda === "0") {
            moneda = "Dolares"
        }
        else if (moneda === "1") {
            moneda = "Pesos"
        }

        console.log(moneda)

        const nuevoPrestamo = new Prestamos(tipo, moneda, monto, cantCuotas)
        //alert(" Eligio: \n" + " Prestamo: " + nuevoPrestamo.tipo + "\n Moneda: " + nuevoPrestamo.moneda + "\n Monto: " + nuevoPrestamo.monto + "\n Cantidad de Cuotas: " + nuevoPrestamo.cantCuotas);    
        arrayprestamos.push(nuevoPrestamo)
        console.log(nuevoPrestamo)
        console.log(arrayprestamos)

        if (nuevoPrestamo.tipo === "Automotor") {
            prestamoAutomotor()
        }
        else if (nuevoPrestamo.tipo === "Inmobiliario") {
            prestamoInmobiliario()
        }
    }
    localStorage.removeItem('usuario')
    
}

function mostrarListadoPrestamos() {
    let resultadoPesos = ""
    let resultadoDolares = ""
    //let resultado = "Los prestamos solicitados son : \n"

    //Creo copia del array de objetos para poder filtrar por moneda

    let prestamoPesos = arrayprestamos.slice().filter(prestamo => prestamo.moneda === 'Pesos');
    let prestamoDolares = arrayprestamos.slice().filter(prestamo => prestamo.moneda === 'Dolares');

    prestamoPesos.forEach(prestamo => {
        resultadoPesos += "Tipo: " + prestamo.tipo + " - " + " " + "Monto: " + prestamo.monto + " - " + " " + "Cantidad de Cuotas: " + prestamo.cantCuotas
    });

    prestamoDolares.forEach(prestamo => {
        resultadoDolares += "Tipo: " + prestamo.tipo + " - " + " " + "Monto: " + prestamo.monto + " - " + " " + "Cantidad de Cuotas: " + prestamo.cantCuotas
    });

    //Mostramos los prestamos en diferentes monedas
    Swal.fire({
        title: `${usuario}`,
        html: `Los pr??stamos solicitados en pesos son <br> ${resultadoPesos}<br>Los pr??stamos solicitados en d??lares son <br> ${resultadoDolares}`,
        icon: 'success',
        position: 'center',
        confirmButtonText: 'Ok!'
    })
    //alert(resultadoPesos + " " + resultadoDolares)
    //cargarPrestamos()
}


function prestamos() {
    let opcion = prompt("Ingrese una opcion: \n 1: Simular Prestamo Automotor \n 2: Simular Prestamo Inmobiliario \n 3: Informe de Prestamos \n 4: Finalizar");

    while (opcion != 3) {
        if (opcion === "1") {
            prestamoAutomotor()
        }
        if (opcion === "2") {
            prestamoInmobiliario()
        }
        alert("Gracias por su Visita!");
        opcion = "4";
        break;
    }
}


function prestamoAutomotor() {
    let resultado;
    let moneda;

    //Recorro el array de prestamos
    arrayprestamos.forEach(prestamo => {
        let intCapital = parseInt(prestamo.monto)
        let intcantCuotas = parseInt(prestamo.cantCuotas)

        //Calculo del interes capital ingresado + tasa de interes * cantidad de cuotas ingresadas + el capital 
        //Dolares = 0.10 anual
        //Pesos = 0.20 anual

        if (prestamo.moneda === "Dolares") {
            resultado = intCapital * (0.10 * intcantCuotas / 12) + intCapital
        }
        else if (prestamo.moneda === "Pesos") {
            resultado = intCapital * (0.20 * intcantCuotas / 12) + intCapital
        }

        moneda = prestamo.moneda

    });
    totalAPagar = resultado
    //alert("El total a pagar es: " + resultado + " " + moneda)

    //Volvemos a llamar a la funcion para consulta de prestamos    

    //cargarPrestamos()

}

function prestamoInmobiliario() {
    let resultado;
    let moneda;

    //Recorro el array de prestamos
    arrayprestamos.forEach(prestamo => {
        console.log(prestamo);
        let intCapital = parseInt(prestamo.monto)
        let intcantCuotas = parseInt(prestamo.cantCuotas)

        console.log(prestamo.moneda)
        //Calculo del interes capital ingresado + tasa de interes * cantidad de cuotas ingresadas + el capital 
        //Dolares = 0.10 anual
        //Pesos = 0.20 anual

        if (prestamo.moneda === "Dolares") {
            resultado = intCapital * (0.30 * intcantCuotas / 12) + intCapital
        }
        else if (prestamo.moneda === "Pesos") {
            resultado = intCapital * (0.50 * intcantCuotas / 12) + intCapital
        }

        if (resultado === undefined) {
            alert("El monto no puede estar vacio")
            cargarPrestamos();
        }

        moneda = prestamo.moneda
        //console.log("Los prestamos solicitados son : " + prestamo.tipo)
        //alert("Los prestamos solicitados son : " + prestamo.tipo + " " + prestamo.moneda + " " + prestamo.monto + " " + prestamo.cantCuotas)
    });

    totalAPagar = resultado

    //alert("El total a pagar es: " + resultado + " " + moneda)
    //Volvemos a llamar a la funcion para consulta de prestamos        
    //cargarPrestamos()
}



//Calcular Prestamo
const btn = document.querySelector('#calcular-btn')
btn.addEventListener('click', () => {    
    localStorage.removeItem('usuario');
    localStorage.getItem('usuario')
    if (!usuario) {
        usuario = document.getElementById('formusuario').value
        localStorage.setItem('usuario', usuario)
        console.log(usuario)
    }
    if (usuario == "") {
        
        Swal.fire({
            title: `Indique su nombre`,
            text: ``,
            icon: 'error',
            position: 'center',
            confirmButtonText: 'Ok!'
        })        
    }
    else {
        HTMLcargarPrestamos();
        Swal.fire({
            title: `${usuario}`,
            text: `El total a pagar es ${totalAPagar}`,
            icon: 'success',
            position: 'center',
            confirmButtonText: 'Ok!'
        })
        
    }
    
});

//Listar Prestamos
const btnListado = document.querySelector('#listar-btn')
btnListado.addEventListener('click', () => {
    mostrarListadoPrestamos();
});









/*
const btnUsuario = document.querySelector('#user-btn')

const pedirUsuario = () => {
    usuario = prompt('Ingrese el nombre de usuario')
    localStorage.setItem('usuario', usuario)
}

if (!usuario){
    pedirUsuario()
}

titleUsuario.innerText = `Bienvenido ${usuario}`

btnUsuario.addEventListener('click', () => {
    pedirUsuario()
    titleUsuario.innerText = `Bienvenido $(usuario)`
})
*/

//Inicio del programa

// Bienvenida();
// cargarPrestamos();