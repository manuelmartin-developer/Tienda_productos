// EJERCICIO: Tienda de productos

// 1 - Hacer fetch de productos
// https://fakestoreapi.com/products
// 2 - Generar en el DOM una lista UL/LI con el titulo de cada elemento

//? FETCH DE PRODUCTOS
const productsUrl = 'https://fakestoreapi.com/products';
let products;
const fetchProducts = async () =>{
    
    await fetch(productsUrl)
    .then(response => response.json())
    .then(products => {

        console.log(products);
        
        let productsUl = document.createElement("ul");
        productsUl.id = "ul";
        let script = document.querySelector("#script");
        script.before(productsUl);
        let productList = document.querySelector("ul");
        
        for(let product of products){
            let productLi = document.createElement("li");
            productLi.id = "li";
            productLi.innerHTML = product.title
            productList.appendChild(productLi);
        }
    }
    )
    };

fetchProducts();

// 3 - Hacer un fetch a fakestoreapi para obtener las categorías de productos (Buscar en la documentación de la API el endpoint correspondiente)
// 4 - Generar en el DOM un <select> que contenga en sus opciones los nombres de las categorías en fakestoreapi. Las opciones deberán generarse dinámicamente, como los <li> del punto 2, no podrán escribirse a mano. La primera opción de nuestro <select> deberá ser "Todas las categorías".
// 5 - Al seleccionar una categoría nuestra app deberá hacer un nuevo fetch a fakestoreapi para obtener solo los productos correspondientes a esa categoría. (Buscar en la documentación de la API el endpoint correspondiente)
// 6 - Eliminar del DOM la lista anterior y generar los nuevos items con la información de cada elemento.
// 7 - Modificar la función que muestra en el DOM las etiquetas <li> (punto 2), para que nuestra aplicación muestre la información completa de cada producto en una tarjeta como las que podemos encontrar en una tienda online. (editado) 

const categoriesUrl = 'https://fakestoreapi.com/products/categories';

const fetchCategories = async () => {

    await   fetch(categoriesUrl)
            .then(response => response.json())
            .then(categories => {

        let selectCategories = document.createElement("select");
        selectCategories.id = "select";
        let productList = document.querySelector("ul");
        productList.after(selectCategories);
        let categoryOption = document.createElement("option");
        categoryOption.id = "option";
        categoryOption.innerHTML = "Todas las categorias";
        selectCategories.appendChild(categoryOption);

        for(let category of categories){
            let categoryOption = document.createElement("option");
            categoryOption.innerHTML = category;
            selectCategories.appendChild(categoryOption);
        };
        let allCategories = document.querySelector("select");
        allCategories.addEventListener("change", () =>{

            let currentCategory = allCategories.value;
            let url = "";
            if(currentCategory !== "Todas las categorias"){
                url = `https://fakestoreapi.com/products/category/${currentCategory}`;
            }else{
                url = "https://fakestoreapi.com/products";
            }

          fetch(url)
            .then(res=>res.json())
            .then(categoryProducts=>
             {
                 console.log(categoryProducts);
                let allLi = document.querySelectorAll("#li");
                let productList = document.querySelector("ul");

                for(let li of allLi){
                    productList.removeChild(li);
                };
                
                for (const product of categoryProducts) {
                    let productLi = document.createElement("li");
                    productLi.id = "li";
                    productLi.innerText = product.title
                    productList.appendChild(productLi)

                }
                });
        });
    }); 

}

fetchCategories();