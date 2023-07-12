// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const API = "https://api.unsplash.com/photos/random/?client_id=osvC4CFIy9TQtImOfc_eA-GTn5r7RoKRA-SmKpPgRkE&count=10";

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 10;


// get photos from API
const getPhotos = async () => {
    try{
        const response = await fetch(API);

        photosArray = await response.json();
        displayPhotos();
    }
    catch(err){
        console.log(err);
    }
};



// check if all images are loaded
function imageLoader(){
    imagesLoaded++;

    if(imagesLoaded === totalImages){
        ready = true;
        imagesLoaded = 0;
    }
}


const imageContainer = document.getElementById("img-container");

// display data in photos
function displayPhotos(){
    photosArray?.map((photos) => {
        const img = document.createElement("img");
        img.setAttribute("src", photos.urls.regular);
        img.addEventListener("load", imageLoader);
        imageContainer.append(img);
    });
}


// document.body.offsetHeight   --> height of website
// window.scrollY  ---> middle  2000 -- > 1000
// load image when u neares to bottom of page
window.addEventListener("scroll", () => {
    if(window.scrollY >= document.body.offsetHeight - 2000 && ready){
        ready = false;
        getPhotos();
    }
});


getPhotos();