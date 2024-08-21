const map = L.map('issMap').setView([0, 0], 0);
const marker = L.marker([0, 0]).addTo(map);

        const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        


        //function to get json
        async function getISS() {
            const response = await fetch(iss_url);
            const data = await response.json();
            const {latitude, longitude} = data;
            console.log(latitude);
            console.log(longitude);

            marker.setLatLng([latitude,longitude]);

            document.getElementById('lat').textContent = latitude;
            document.getElementById('lon').textContent = longitude;

        }

        //call function
        getISS();