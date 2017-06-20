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
    
    //Закрыть подменю если второе подменю открыто
    var subs = $('.mm-vertical'); // List of expandable sub-menu items.
    $(subs).each(function () { // Iterate through each sub-menu item...
        $(this).click(function () { // Set up onclick handler...
            var clicked = this; // Cache reference to clicked item.
            for(i = 0, c = subs.length; i < c; i++) { // Iterate through list of sub-menu items...
                if (subs[i] !== clicked) { // If current item is not the clicked item...
                    var parent = $(subs[i]).closest('li'); // Get reference to parent <li>, then remove the mm-opened class.
                    $(parent).removeClass('mm-opened');
                }
            }
        });
    });
    
   
  
});
