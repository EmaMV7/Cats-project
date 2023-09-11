const resetButton = document.querySelector('.button');
const favorites = document.createRange().createContextualFragment(``)

const API_URL = [
    'https://api.thecatapi.com/v1/images/search',
    '?',
    `${API_KEY}`,
    '&',
    'limit=3',
].join('');

const API_URL_FAVORITES = [
    'https://api.thecatapi.com/v1/favourites',
    '?',
    `${API_KEY}`,
].join('');


const spanError = document.getElementById("error")

async function loadCats(){
    const res = await fetch(API_URL);
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
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }
        
}

async function loadFavoriteCats(){
    const res = await fetch(API_URL_FAVORITES + '&sub_id',{
        hearders:{
            "content-type":"application/json"
        }
    });
    const data = await res.json();
    console.log('Favorites');
    console.log(data);
    
    const img4 = document.getElementById('img4')
    img4.innerHTML = data[0].image.url;


    if(res.status !== 200){
        spanError.innerHTML = "LF Hubo un error: " + res.status;
    }
}

async function saveCats(){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id:'8jr'
        })
    })

    console.log('save');
    console.log(res);



}

loadCats();
loadFavoriteCats();
//https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
