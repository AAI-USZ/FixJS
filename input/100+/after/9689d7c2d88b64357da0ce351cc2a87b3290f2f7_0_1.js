function main(){
    //--------<on submit when search>------------//
    $("#search-form").on("submit",search);
    //--------</on submit when search>------------//
    
    //-------------------<letra blanca del perfil on hover>-------------------------//
    $("ul.dropdown-menu li.current-user").hover(
        function(e){$(".content-box *").addClass("color-fff")},
        function(e){$(".content-box *").removeClass("color-fff")}
    );
    //-------------------</letra blanca del perfil on hover>-------------------------//
    
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
    //------ </On Login Submit >--------------/
}