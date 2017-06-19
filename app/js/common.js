$(function() {
    function clog(item) {
        console.log(item);
    }
    
    
    //$(".sf-menu").after("<div id='my-menu'>"); //создаем блок для меню
    $(".sf-menu").clone().appendTo("#my-menu"); //клонируем меню с шапки в мобильное меню
    $("#my-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
    $("#my-menu").find("ul").removeClass("sf-menu"); //очищаем от встроеных стилей
    $('#my-menu').mmenu({
        //dropdown: true, //меню ниже панели
        slidingSubmenus: false,//открытие подменю внутри вниз
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
    var api = $("#my-menu").data("mmenu");
    api.bind("open:start",function(){ //когда меню Открыто
        $(".hamburger").addClass("is-active"); //добавить класс, Появится крестик
    });
    api.bind("close:before",function(){
        $(".hamburger").removeClass("is-active"); //без класса будет гамбургер
    });
    
    
   
  
});
