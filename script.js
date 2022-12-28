let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const contenedorProductos = document.getElementById("contenedor-productos")

renderizarProductos(productos)

function renderizarProductos() {
    productos.forEach(producto => {
        const tarjetas = document.createElement("div")
        tarjetas.className = "producto"

        tarjetas.innerHTML = `
                <img src=${producto.img} class="imagen-producto">
                <h3>${producto.nombre}</h3>
                <span>$${producto.precio}</span>
                <button id="agregar${producto.id}" class= "boton.agregar">Agregar</button>
            `
        contenedorProductos.append(tarjetas)

        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            saveLocal()
            contadorProductoCarrito()
        })
    })
}




const agregarAlCarrito = prodId => {
    const item = productos.find(prod => prod.id === prodId)
    carrito.push(item)
}





//CARRITO RENDERIZADO
const verCarrito = document.getElementById("ver-carrito")
const carritoContainer = document.getElementById("carrito-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")



const contadorProductoCarrito = () => {
    cantidadCarrito.style.display = "block"
    cantidadCarrito.innerText = carrito.length
}
contadorProductoCarrito()





const creacionCarrito = () => {
    carritoContainer.innerHTML = ""
    carritoContainer.style.display = "flex"
    const headerCarrito = document.createElement("div")
    headerCarrito.className = "header-carrito"
    headerCarrito.innerHTML = `
    <h2 class="title-carrito">Compra</h2>
    `

    carritoContainer.append(headerCarrito)

    const botonCarrito = document.createElement("h2")
    botonCarrito.innerText = "x"
    botonCarrito.className = "boton-cerrar"

    botonCarrito.addEventListener("click", () => {
        carritoContainer.style.display = "none"
    })


    headerCarrito.append(botonCarrito)

    carrito.forEach(producto => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "producto-content"
        carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <span class="remove-product">❌</span>
        `
        carritoContainer.append(carritoContent)

        //ELIMINAR ELEMENTO ID
        let eliminar = carritoContent.querySelector(".remove-product")
        eliminar.addEventListener("click", () => {
            eleminarProducto(producto.id)
        })
    })

    const total = carrito.reduce((acc, el) => acc + el.precio, 0)

    const totalBuy = document.createElement("div")
    totalBuy.className = "total-container"
    totalBuy.innerHTML = `
    total a pagar: $${total}
    `
    carritoContainer.append(totalBuy)
}

verCarrito.addEventListener("click", creacionCarrito)




const eleminarProducto = (Id) => {
    const encontrarId = carrito.find((element) => element.id === Id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== encontrarId
    })
    creacionCarrito()
    saveLocal()
    contadorProductoCarrito()
}





//LOCAL STORAGE
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


