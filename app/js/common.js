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
        //autoHeight: true,
        //autoWidth: true,
        //autoplay: true,
        autoplayTimeout: 5000,
        dots: true
    });
    
    //Плавная прокрутка страницы jQuery.scrollSpeed
    $.scrollSpeed(100, 800);
    
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
    
    
    
    
    
    
    
});
