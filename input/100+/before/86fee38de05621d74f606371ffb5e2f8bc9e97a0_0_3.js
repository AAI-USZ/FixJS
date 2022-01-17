function(item){

    if(item == null){

        return;

    }

    

    if(item.f.un != AJS.params.remoteUser){

        this.startBlink();    

    }

    

    if(this.isClosed() && this.initialized){

        this.show();

        chatBar.restructureChatBoxes();

    }

    var message = this.replaceChatMessage(item.m);

    var content = this.box.find('.cb-content');

    

    var dt = new Date(item.t);

    var holderId = dt.getFullYear()+''+dt.getMonth()+dt.getDate()+dt.getHours()+dt.getMinutes();

    var messageBox = content.find('.cb-mc[slot='+holderId+']');

    if(messageBox.size() == 0){

        // pro zeit / datum eine box

        messageBox = jQuery('<div/>').addClass('cb-mc').attr('slot', holderId);    

        messageBox.appendTo(content);

    

        var messageTime= jQuery('<div/>').addClass('cb-mt');    

        messageTime.text(this.formatTime(dt));

        messageTime.appendTo(messageBox)

    

    }

    // habe nun aktuellen messageBox -> ist letzter eintrag auch von item.f.un  user?

    var userBox =  messageBox.find('.cb-ut:last');

    if(userBox.attr('unid') != item.f.id){

        userBox = null;

    }

    

    var messageHolder ;

    if(userBox == null ){

        userBox = jQuery('<div/>').addClass('cb-ut').attr('unid', item.f.id);    

        userBox.appendTo(messageBox)

        var userLink = jQuery('<a/>').attr('href', AJS.contextPath() + '/display/~'+item.f.un )

        userLink.addClass('userLogoLink').attr('data-username', item.f.un)

        var userLogo = jQuery('<img/>').attr('src', AJS.contextPath() + item.f.p).attr('alt','User icon: ' + item.f.un).attr('title',item.f.fn);

        userLogo.appendTo(userLink);

        // user image am content

        userLink.appendTo(userBox)

        messageHolder =   jQuery('<div/>').addClass('cb-mh');

        var from = jQuery('<div/>').addClass('cb-f').text(item.f.fn);

        from.appendTo(messageHolder)

        messageHolder.appendTo(userBox)

        try{

            AJS.Confluence.Binder.userHover();

        }catch(e){}

    }else {

        messageHolder =    userBox.find('.cb-mh') ;

    }

    //     nun einfach die nachricht noch drann

    var messageItem = jQuery('<div/>').addClass('cb-mtext').html(message).attr('t',item.t);

    messageItem.appendTo(messageHolder);

    

    content.scrollTop(content[0].scrollHeight);    

}