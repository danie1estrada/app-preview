var map,
    num = 10,
    icon = 3,
    markers = [],
    color = "#f00",
    displayPolygon = true,

    //Centro del mapa
    place = { lat: 21.124023, lng: -101.679083 },

    icons = ["code", "code-important", "code-urgent", "code-default",
    "health", "health-important", "health-urgent", "health-default",
    "support", "support-important", "support-urgent", "support-default",
    "money", "money-important", "money-urgent", "money-default",
    "food", "food-important", "food-urgent", "food-default",
    "rh", "rh-important", "rh-urgent", "rh-default"],

    lat = 0.008250, //0.003550
    lng = 0.005466, //0.002666

    upperRight = { lat: place.lat + lat, lng: place.lng + lng },
    upperLeft  = { lat: place.lat + lat, lng: place.lng - lng },
    lowerRight = { lat: place.lat - lat, lng: place.lng + lng },
    lowerLeft  = { lat: place.lat - lat, lng: place.lng - lng },

    locations = [
    // { title: "cr", location: place },
    // { title: "ul", location: upperLeft  },
    // { title: "ur", location: upperRight },
    // { title: "ll", location: lowerLeft  },
    // { title: "lr", location: lowerRight }
    ];

function createLocation() {

    var lat = Math.random() * (upperRight.lat - lowerRight.lat) + lowerRight.lat;
    var lng = Math.random() * (upperRight.lng - upperLeft.lng) + upperLeft.lng;

    locations.push({
        title: "Lat: " + lat + "\nLng: " + lng,
        location: { lat: lat, lng: lng }
    });
}

for (var i = 0; i < num; i++) {
    createLocation();
}

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: place,
        zoom: 15,
        disableDefaultUI: true,
        styles: [
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    var largeInfoWindow = new google.maps.InfoWindow();
    //var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {

        var marker = new google.maps.Marker({
            map: map,
            position: locations[i].location,
            title: locations[i].title,
            //animation: google.maps.Animation.DROP,    //Cae
            //animation: google.maps.Animation.BOUNCE,  //Rebota
            icon: `public/img/${icons[Math.floor(Math.random() * icons.length)]}.png`,
            //optimized: false    //Permite iconos animados
        });

        markers.push(marker);

        //bounds.extend(marker.position);

        marker.addListener("click", function() {
            populateInfoWindow(this, largeInfoWindow);
        });

        //map.fitBounds(bounds);

        map.addListener("click", (e) => {
            
        });
    }

    function populateInfoWindow(marker, infoWindow) {
       
        //if (infoWindow.marker != marker) {
            infoWindow.marker = marker;
            infoWindow.setContent(
                '<div class="info-window">' +
                    '<h2>Nombre de la empresa</h2>' +
                    '<img src="public/img/biblio.jpg" height="135px">' +
                    '<br>' +
                    '<h3>Nombre del puesto</h3>' +
                    '<h4>Sueldo</h4>' +
                    '<p style="color: black; padding: 0px;">Descripción breve del puesto.<br> <a href="">Ver más...</a></p>' +
                    '<div class="iw-group">' +
                        '<button class="btn">Postularme</button>' +
                        '<a href="">Denunciar</a>' +
                    '</div>' +
                '</div>'
            );

            infoWindow.open(map, marker);
    }

    var coords = [
        upperRight,
        upperLeft,
        lowerLeft,
        lowerRight
    ];

    if (displayPolygon) {
        var area = new google.maps.Polygon({
            map: map,
            paths: coords,
            strokeColor: color,
            strokeWeight: 2,
            strokeOpacity: 0.8,
            fillColor: color,
            fillOpacity: 0.1
        });
    }
}