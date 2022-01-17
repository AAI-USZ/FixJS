function() {

	$('#menu').menu();

        

        $("#search-box").focus(function(){

        if($(this).val() == "Пребарување" ){

            $(this).val('');

            $(this).css('color','black');

        }                

    });

    

    $("#search-box").blur(function(){

        if($(this).val() == "" ){

            $(this).val('Пребарување');

            $(this).css('color','#b0afaf');

        }                

    });

    

    $("#search-box").keypress(function(e) {

        if(e.keyCode == 13) {

            $(".search-button").click();

        }

    });

    

    $(".search-button").click(function(){

        var s = $('#search-box').val();

        if(s != 'Пребарување')

        {

           

           window.open(base_url + 'articles/search'  + '?s=' + encodeURIComponent(s)  , '_self');

        }

        

    });

        

        

        

        

        

        

}