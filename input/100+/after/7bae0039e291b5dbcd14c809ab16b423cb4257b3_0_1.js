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

        

        

        

        

    $('#newsletter_subscribe').click(function() {

        $('#newsletter_subscribe_holder').slideDown('fast');

    });    

        

    $('#email_submit').click(function(){

        $.post(

               base_url + 'newsletter/subscribe_ajax',

               {    email : $('#email_holder').val()

               },

               function(data){

                   obj = jQuery.parseJSON(data);

                   if(obj.success != undefined){

                       $('#email_response').html('Успешно се пријавивте');

                       $('#email_holder').val('');

                   }                   

                   if(obj.errors != undefined){

                       $('#email_response').html(obj.errors.email);

                   }

               }

        );

    });     

        

        

        

        

}