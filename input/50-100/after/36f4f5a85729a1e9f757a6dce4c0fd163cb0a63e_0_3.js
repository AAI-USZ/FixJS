function() {
            //console.log('time kick');
            Slide.scroll();
            ((notiShowCnt++) % 2) || Notification.changeNotice();

            if(Meteor.status().connected){
                Notification.alertOff();
            }else{
                Notification.alertOn('服务器断开');
            }
        }