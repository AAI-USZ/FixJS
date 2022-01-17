function(){

    

    $(document).ready(function(){



        $('#coned-search-results').hide();

        $('#close-search').hide();

        

        function goDirectlyToSearchForm(){

            $('#big-audience-nav').hide();

            $('#coned-messaging-area').hide();

            $('#coned-landing-content').hide();

            $('#coned-search-results').delay(450).fadeIn(1250);    

        };

        // uncomment/comment this line to have the landing page go immediately into search mode

        //goDirectlyToSearchForm();



        $('.coned-search-field').focusin(function(){

            

            $(this).keydown(function(event){

                $('#big-audience-nav').hide();

                $('#coned-messaging-area').hide();

                $('#coned-landing-content').hide();

                $('#coned-search-results').delay(450).fadeIn(1250);

                $('#coned-search-bar form').animate({width:400},100);

                $('.coned-search-submit').addClass('smallSearchBtn');

                $('#close-search').show();

                

            });

            

        });



        $('#close-search').click(function(event){

            $('.coned-search-submit').removeClass('smallSearchBtn');

            $('#coned-search-bar form').animate({width:420},100);

            $('#coned-search-results').fadeOut(50).hide();

            $('#coned-landing-content').fadeIn(1250);

            $('#coned-messaging-area').fadeIn(1250);

            $('#big-audience-nav').fadeIn(1250);

            $(this).hide();

            return false

        });



        

        $('.list > li > a').parent().append('<div class="goto-estore"><b>Go to e-store&nbsp;&rarr;<b></div>');

        



        //

        //  * coned form functions *

        //

        $('#days > label, #campus > label').click(function(event) { 



            if (! $(this).hasClass('btn-selected')) {

                $(this).addClass('btn-selected');

                return false

            } else {

                $(this).removeClass('btn-selected');

                return false

            };

        });



    });

}