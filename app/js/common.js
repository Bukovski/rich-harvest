$(function() {
    function clog(item) {
        console.log(item);
    }
    
    
    //$(".nav-list").after("<div id='mobile-menu'>"); //создаем блок для меню
    $(".nav-list").clone().appendTo("#mobile-menu"); //клонируем меню с шапки в мобильное меню
    $("#mobile-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
    $("#mobile-menu").find("ul").removeClass("nav-list"); //очищаем от встроеных стилей
    $('#mobile-menu').mmenu({
        slidingSubmenus: false,//открытие подменю внутри вниз
        autoHeight: true, //авто подгон высоты меню
        //iconPanels: true,
        extensions: ["border-none", "theme-white"],
        offCanvas: {
            position: "left", //открывать слева
            zposition : "front" //не сдвигать body при раскрывании!!!
        },
        navbar: {
            title: "" //убираем название в меню сверху
        }
    });
    //Крестик-гамбургер https://jonsuh.com/hamburgers/
    var api = $("#mobile-menu").data("mmenu");
    api.bind("open:start",function(){ //когда меню Открыто
        $(".hamburger").addClass("is-active"); //добавить класс, Появится крестик
    });
    api.bind("close:before",function(){
        $(".hamburger").removeClass("is-active"); //без класса будет гамбургер
    });
    $('.mobile-nav').click(function () {
        api.close();
    });
    
    //Закрыть подменю если второе подменю открыто (всегда ниже инициализации mmenu)
    var subs = $('.mm-next');
    $(subs).each(function () {
        $(this).click(function () {
            var clicked = this;
            for(var i = 0, subMenu = subs.length; i < subMenu; i++) {
                if (subs[i] !== clicked) {
                    var parent = $(subs[i]).parent('li');
                    $(parent).removeClass('mm-opened');
                }
            }
        });
    });
    
    
    //при скроле уменьшается шапка по высоте https://codepen.io/Dannzzor/pen/dlAap
    $(window).scroll(function(){
        $(window).width(function (e, index) {
            if (index > 768) { //не для мобильных
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 49) { //высота скрола до применения эффекта
                    $('body').addClass('header-fixed');
                } else {
                    $('body').removeClass('header-fixed');
                }
                var topOffset = $('.carousel').offset().top; //класс начала контента
                var headerHeight = $('.header').height();
                var transitionPoint = topOffset - headerHeight;
                if (scrollTop > transitionPoint) {
                    $('.header').addClass('alt-header');
                } else {
                    $('.header').removeClass('alt-header');
                }
            }
        });
    
    });
    
    //карусель верхняя
    $(".carousel-wrap").owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false,
        autoHeight: true,
        autoWidth: true,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true
    });
    
    //карусель нижняя
    $(".carousel-clients__content").owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false,
        autoplayTimeout: 5000,
        dots: true
    });
    
    //кнопка прокрутки вверх
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#go-up').fadeIn();
        } else {
            $('#go-up').fadeOut();
        }
    });
    $('#go-up').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
    
    //Плавная прокрутка страницы jQuery.scrollSpeed
    //$.scrollSpeed(100, 800);
    
});


jQuery(document).ready(function($){
    //Местоположение: долгота, широта и коэффициент увеличения
    var latitude = 41.915305,
        longitude = -87.634359,
        map_zoom = 14;
    
    //Адрес до иконки с маркером
    //var marker_url = 'img/map/icon-location.png';
    var marker_url = 'img/map/location-pointer.svg';
    
    
    var	main_color = '#84b315', //основной цвет
        saturation_value= -1, //насыщенность
        brightness_value= 1; //яркость
    
    //Стили для элементов на карте
    var style= [
        {
            //Насыщенность обозначений на карте
            elementType: "labels",
            stylers: [
                {saturation: saturation_value}
            ]
        },
        {	//Скрываем обозначения станций метро, вокзалов, аэропортов и прочих транспортных узов на карте
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //Скрываем обозначение дорог на карте
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //Скрываем обозначение локальных дорог
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //Скрываем обозначение магистрали на карте
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //Скрываем дорожные обозначения на карте
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {visibility: "off"}
            ]
        },
        //Стили для разных элементов на карте
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
            
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }
    ];
    
    //Создание точки на карте
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style
    }
    //Инициализация карты
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //Добавляем свой маркер местонахождения на карту (свою иконку)
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        icon: marker_url,
    });
    
    //Добавляем свои иконки для кнопок увеличить/уменьшить на карту
    function CustomZoomControl(controlDiv, map) {
        var controlUIzoomIn= document.getElementById('zoom-in'),
            controlUIzoomOut= document.getElementById('zoom-out');
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
    
    
});

