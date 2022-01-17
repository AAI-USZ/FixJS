function() {
        var notiShowCnt = 0;

        //console.log('ok?');
        $name = $('.name');
        $content = $('.content');

        $name.val(localStorage.name);

        router();

        Slide.initialize();
        Notification.initialize();

        var timer = setInterval(function() {
            //console.log('time kick');
            Slide.scroll();
            ((notiShowCnt++) % 2) || Notification.changeNotice();

            if(Meteor.status().connected){
                Notification.alertOff();
            }else{
                Notification.alertOn('服务器断开');
            }
        },
        5 * 1000);
        
        // debuger
        close = function() {
            clearInterval(timer);
        };
    }