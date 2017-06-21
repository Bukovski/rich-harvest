$(function() {
    function clog(item) {
        console.log(item);
    }
    
    
    //$(".navbar__menu").after("<div id='my-menu'>"); //создаем блок для меню
    $(".navbar__menu").clone().appendTo("#mobile-menu"); //клонируем меню с шапки в мобильное меню
    $("#mobile-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
    $("#mobile-menu").find("ul").removeClass("navbar__menu"); //очищаем от встроеных стилей
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
                var topOffset = $('.wrapper').offset().top; //класс начала контента
                var headerHeight = $('.page-header').height();
                var transitionPoint = topOffset - headerHeight;
                if (scrollTop > transitionPoint) {
                    $('.page-header').addClass('alt-header');
                } else {
                    $('.page-header').removeClass('alt-header');
                }
            }
        });
    
    });
    
  
    
    
    

    
    
   
  
});
