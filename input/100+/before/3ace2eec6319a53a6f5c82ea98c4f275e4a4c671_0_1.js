function(event){

        var self = this;

        switch($(this).attr('id')){

          case 'navi-position':

            $('#navi-position > a > span').css({"backgroundPosition": "-48px 0px"});

            $('#navi-position > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-position > a').css({"color": "", "backgroundColor": ""});

              $('#navi-position > a > span').css({"backgroundPosition": "0px 0px"});

            }, 250);

            break;

          case 'navi-fontain':

            $('#navi-fontain > a > span').css({"backgroundPosition": "-48px -96px"});

            $('#navi-fontain > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-fontain > a').css({"color": "", "backgroundColor": ""});

              $('#navi-fontain > a > span').css({"backgroundPosition": "0px -96px"});

            }, 250);

            break;

          case 'navi-maptype':

            $('#navi-maptype > a > span').css({"backgroundPosition": "-48px -48px"});

            $('#navi-maptype > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-maptype > a').css({"color": "", "backgroundColor": ""});

              $('#navi-maptype > a > span').css({"backgroundPosition": "0px -48px"});

            }, 250);

            break;

          case 'navi-feed':

            $('#navi-feed > a > span').css({"backgroundPosition": "-144px -48px"});

            $('#navi-feed > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-feed > a').css({"color": "", "backgroundColor": ""});

              $('#navi-feed > a > span').css({"backgroundPosition": "-96px -48px"});

            }, 250);

            break;

          case 'navi-address':

            $('#navi-address > a > span').css({"backgroundPosition": "-144px -0px"});

            $('#navi-address > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-address > a').css({"color": "", "backgroundColor": ""});

              $('#navi-address > a > span').css({"backgroundPosition": "-96px -0px"});

            }, 250);

            break;

          default:

            break;

        }

      }