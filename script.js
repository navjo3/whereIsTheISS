const map = L.map('issMap').setView([0, 0], 3);

const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//icon customization
const myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 50],
    iconAnchor: [0, 0],
});

//map pointer
const marker = L.marker([0, 0],{icon: myIcon}).addTo(map);


//tiles loading
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let firstTime = true;

//function to fetch iss location json
async function getISS() {
    const response = await fetch(iss_url);
    const data = await response.json();
    const {latitude, longitude} = data;
    console.log(latitude);
    console.log(longitude);


    marker.setLatLng([latitude,longitude]);

    if (firstTime){
        map.setView([latitude,longitude],3);
        firstTime =false;
    }

    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;

    marker.bindTooltip('<div class="custom-tooltip">Latitude: ${latitude}, <br> Longitude: ${longitude}').openTooltip();
}

setInterval(getISS, 1000)

//call function
getISS();