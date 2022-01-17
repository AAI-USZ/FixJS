function(){

    var SERVICE_DATA = {
        //url - template for the sharing service url, params are for the popup
        identica: {
            url: "http://identi.ca/notice/new?status_textarea={TEXT}%20{URL}",
            params: "width=820, height=526,toolbar=1,status=1,resizable=1,scrollbars=1"
        },
        twitter: {
            url: "http://twitter.com/share?url={URL}&ref=twitbtn&text={TEXT}",
            params: "width=820,height=526,toolbar=1,status=1,resizable=1,scrollbars=1"
        },
        facebook: {
            url: "http://www.facebook.com/sharer.php?u={URL}&ref=fbshare&t={TEXT}",
            params: "width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1"
        },
        linkedin: {
            url: "http://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TEXT}",
            params: "width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1"
        }
    };
    var URL = "";
    var TEXT = "";

    var share_page = function(service_name){
        if (SERVICE_DATA[service_name]){
            var url = SERVICE_DATA[service_name]['url'];
            $.ajax({
                async: false,
                url: "http://json-tinyurl.appspot.com/?&callback=?",
                dataType: "json",
                data: {'url':URL},
                success: function(data){
                    url = url.replace('{URL}', data.tinyurl);
                },
                error: function(data){
                    url = url.replace('{URL}', URL);
                },
                complete: function(data){
                    url = url.replace('{TEXT}', TEXT);
                    var params = SERVICE_DATA[service_name]['params'];
                    if(!window.open(url, "sharing", params)){
                        window.location.href=url;
                    }
                }
            });
        }
    }

    return {
        init: function(){
            URL = window.location.href;
            TEXT = escape($('h1 > a').html());
            var fb = $('a.facebook-share')
            var tw = $('a.twitter-share');
            var ln = $('a.linkedin-share');
            var ica = $('a.identica-share');
            copyAltToTitle(fb);
            copyAltToTitle(tw);
            copyAltToTitle(ln);
            copyAltToTitle(ica);
            setupButtonEventHandlers(fb, function(){share_page("facebook")});
            setupButtonEventHandlers(tw, function(){share_page("twitter")});
            setupButtonEventHandlers(ln, function(){share_page("linkedin")});
            setupButtonEventHandlers(ica, function(){share_page("identica")});
        }
    }
}