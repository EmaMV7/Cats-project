const resetButton = document.querySelector('.button');

const API_URL = [
    'https://api.thecatapi.com/v1/images/search?',
    'limit=3',
].join('');

const API_URL_FAVORITES = ['https://api.thecatapi.com/v1/favourites?',
`${API_KEY}`].join('');


const API_URL_DELETE_FAVORITES = (id) => [
    'https://api.thecatapi.com/v1/favourites/',
    `${id}`,
    '?',
    `${API_KEY}` 
].join('');

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";


const spanError = document.getElementById("error")

async function loadCats(){
    const res = await fetch(API_URL,{
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY2,
        }
    });
    const data = await res.json();
    console.log('Random');
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = "LR Hubo un error: " + res.status;
    }
    else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
    
        const buttonFC1 = document.querySelector('.addFavorites1');
        const buttonFC2 = document.querySelector('.addFavorites2');
        const buttonFC3 = document.querySelector('.addFavorites3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
            
        buttonFC1.onclick = () => saveCat(data[0].id);
        buttonFC2.onclick = () => saveCat(data[1].id);
        buttonFC3.onclick = () => saveCat(data[2].id);
    }
        
}

async function loadFavoriteCats(){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        hearders:{
            "content-type" : "application/json"
        }
    });
    const data = await res.json();
    console.log('Load Favorites');
    console.log(data);

    posiCats = [];

    if(res.status !== 200){
        spanError.innerHTML = "LF Hubo un error: " + res.status + data;
    }else{
        const favoriteCats = document.querySelector('.favoriteCats');
        favoriteCats.innerHTML = "";

        data.forEach(cats => {            
        const picture = document.createElement('picture');
        const btn = document.createElement('button');
        const img = document.createElement('img');
        const btnText = document.createTextNode('Unfavorite');
        
        picture.classList.add('box-image')
        picture.append(img, btn);
        btn.classList.add('removeFavorites')
        btn.appendChild(btnText);
        btn.onclick = () => {deleteFavoriteCat(cats.id)};
        img.src = cats.image.url;
        img.classList.add('imagen');
        favoriteCats.appendChild(picture);
        });
    }
}

async function saveCat(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    })

    if(res.status !== 200){
        console.log('SV Hubo un error: ' + res);
    }else{
        console.log('save cat')
        loadFavoriteCats();
    }
}

async function deleteFavoriteCat(id){
    console.log('delete');
    const res = await fetch(API_URL_DELETE_FAVORITES(id), {
        method: 'DELETE'
    })
    const data = await res.json();

    if(res.status !== 200){
        spanError.innerHTML = "DF Hubo un error: " + res.status + data; 
    }else{
        console.log('Removed cat from favorites');        
        loadFavoriteCats();
    }
}

async function uploadCatPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            'X-API-KEY': API_KEY2,
        },
        body: formData,
    })

    const data = await res.json();

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        console.log('Foto de gato subida');
    }
    
    saveCat(data.id)
}

loadCats();
loadFavoriteCats();

//https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
