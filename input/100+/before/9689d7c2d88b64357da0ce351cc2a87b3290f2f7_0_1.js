function main(){
    //    var url = "http://sg.media-imdb.com/suggests/"+q0+"/"+q+".json";
    //    var url2 = "http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q="+q;
    //    var url3 = "http://www.imdb.com/xml/find?xml=1&tt=1&nm=on&q="+q;
    //    var url6="http://api.themoviedb.org/2.1/Movie.search/es-CO/xml/"+APIKEY+"/"+q;
    //    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;
    
    //--------<on submit when search>------------//
    $("#search-form").on("submit",search);
    //--------</on submit when search>------------//
    
    //-------------------<letra blanca del perfil>-------------------------//
    $("ul.dropdown-menu li.current-user").hover(
        function(e){$(".content-box p, .content-box small").addClass("color-fff")},
        function(e){$(".content-box p, .content-box small").removeClass("color-fff")}
    );
    //-------------------</letra blanca del perfil>-------------------------//
    
    //------<No cierra el Menú de login al dar click>---------------/
    $(".next-li").focus(function(e){
            $("ul.dropdown-menu").addClass("disblock")
        }).blur(function(e){
           // $("ul.dropdown-menu").removeClass("disblock")
        });
    //------ </No cierra el Menú de login al dar click>--------------/
    
    
    //------ <On Login Submit >--------------/
    $("#close-login-menu").on("click",function(e){
        e.preventDefault();
        $("ul.dropdown-menu").removeClass("disblock");
    });
//    $(".btn-group").on("click",function(e){
//        e.preventDefault();
//        if($("#menu-login").hasClass("open"))
//            $("ul.dropdown-menu").removeClass("disblock");
//        
//    });
    //------ </On Login Submit >--------------/
}