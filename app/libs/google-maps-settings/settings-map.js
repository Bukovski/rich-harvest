function loadAPI() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFpJktmqNycIUrccbsVWxLiutAlACa_Ys&callback=initMap";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}
loadAPI();


function initMap() {
    var map = new google.maps.Map(document.getElementsByClassName('footer-map__container')[0], {
        center: {lat: 41.963821, lng: -87.774667},
        zoom: 15,
        panControl: false, //убираем чтобы вставитьс свою
        zoomControl: false, // отключает элемент управления Zoom
        mapTypeControl: false, //отключает, тип отображаемой карты
        streetViewControl: false, //отключает,панорамы Street View
        scrollwheel: false, //отключить скролл колесом мышки
        styles: [ //вставляем сгенерированный стиль карты отсюда https://mapstyle.withgoogle.com/
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#e6eada"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });
    var marker = new google.maps.Marker({
        position:  {lat: 41.963821, lng: -87.774667},
        map: map,
        icon: new google.maps.MarkerImage('../img/map/location-pointer.svg',
            null, null, null, new google.maps.Size(70,70)), //размер  SVG
        draggable: false
    });
    //Добавляем свои иконки для кнопок увеличить/уменьшить на карту
    function CustomZoomControl(controlDiv, map) {
        var controlUIzoomIn= document.getElementsByClassName('footer-map__zoom-in')[0],
            controlUIzoomOut= document.getElementsByClassName('footer-map__zoom-out')[0];
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);
        //Делаем привязку для кнопок увеличить/уменьшить при клике
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });
    }
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);
    //Помещаем кнопки увеличить/уменьшить на карту в левый верхний угол
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
    
    if(map.controls[google.maps.ControlPosition.LEFT_TOP]) { //если карта загрузилась то она появится
        document.getElementsByClassName('footer-map')[0].style.display = 'block';
    }
    
}
/**
 * Created by alessa on 26.06.17.
 */
