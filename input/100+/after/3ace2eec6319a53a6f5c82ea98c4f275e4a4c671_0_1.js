function(event){

        var self = this;

        switch($(this).attr('id')){

          case 'navi-position':

            $('#navi-position > a > span').addClass('navigation-position-a-active-span');

            $('#navi-position > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-position > a').removeClass('navigation-a-active');

              $('#navi-position > a > span').removeClass('navigation-position-a-active-span');

            }, 500);

            break;

          case 'navi-fontain':

            $('#navi-fontain > a > span').addClass('navigation-fontain-a-active-span');

            $('#navi-fontain > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-fontain > a').removeClass('navigation-a-active');

              $('#navi-fontain > a > span').removeClass('navigation-fontain-a-active-span');

            }, 500);

            break;

          case 'navi-maptype':

            $('#navi-maptype > a > span').addClass('navigation-maptype-a-active-span');

            $('#navi-maptype > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-maptype > a').removeClass('navigation-a-active');

              $('#navi-maptype > a > span').removeClass('navigation-maptype-a-active-span');

            }, 350);

            break;

          case 'navi-feed':

            $('#navi-feed > a > span').addClass('navigation-feed-a-active-span');

            $('#navi-feed > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-feed > a').removeClass('navigation-a-active');

              $('#navi-feed > a > span').removeClass('navigation-feed-a-active-span');

            }, 350);

            break;

          case 'navi-address':

            $('#navi-address > a > span').addClass('navigation-address-a-active-span');

            $('#navi-address > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-address > a').removeClass('navigation-a-active');

              $('#navi-address > a > span').removeClass('navigation-address-a-active-span');

            }, 500);

            break;

          default:

            break;

        }

      }