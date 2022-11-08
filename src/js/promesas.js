import {films} from './peliculas';
import {people} from './peliculas';

const buscar = document.querySelector('.buscar'),
    divPeliculas = document.querySelector('.infopelicula');

export const infopelicula = () => {
    buscar.addEventListener('click', () =>{
        divPeliculas.innerHTML = '';
        const pelicula = document.querySelector('.name').value;
        obtenerPeliculaAwait(pelicula);
    });
}

const obtenerPeliculaAwait = async (pelicula) => {
    try {
        const peliculas = await buscarPeliculas( pelicula );
        await Promise.all(peliculas.map( buscarPersonaje ));
    }catch(err){
        throw err;
    }       
}

const buscarPeliculas = async(pelicula) => {
    let peliculas = films.filter(film => film.title.toLowerCase().includes(pelicula.toLowerCase()));
    if( peliculas ) {
        return peliculas;
    } else {
        throw Error(`No existe`);
    }
}

const buscarPersonaje = async(peli) => {
    let personaje = people.filter(person => person.films[0] == peli.id);
    crearInfoPelicula(peli);
    if(personaje){
        personaje.map(crearInfoPersonaje);
    }else{
        throw Error(`No existe`);
    }
}


const crearInfoPelicula = (pelicula) => {
    const htmlPeli = `
    <div id="${pelicula.id}" class="peli">
        <img src="${ pelicula.image }" class="img-peli">
        <div class="info">
            <h2>${pelicula.title}</h2>
            <ul>
                <li>Original title : ${pelicula.original_title}</li>
                <li>Original title romanised : ${pelicula.original_title_romanised}</li>
                <li>Description : ${pelicula.description}</li>
                <li>Director : ${pelicula.director}</li>
                <li>Date : ${pelicula.release_date}</li>
            </ul>
        </div>
    </div>
    `;

    const div = document.createElement('div'); 
    div.innerHTML = htmlPeli;
    divPeliculas.append(div.lastElementChild);
}

const crearInfoPersonaje = (personaje) => {
    const htmlPers = `
    <div id="${personaje.id}">
        <h4>Character</h4>
        <ul>
            <li>Name : ${personaje.name}</li>
            <li>Gender : ${personaje.gender}</li>
            <li>Age : ${personaje.age}</li>
        </ul>
    </div>
    `;

    const div = document.createElement('div'); 
    div.innerHTML = htmlPers;
    divPeliculas.append(div.lastElementChild);
}




