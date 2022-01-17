function(event){
        if (event.which == '13'){
            console.log('Hit Enter!');
            event.preventDefault();
            hostSubmitChat();
        }
        //isTyping(true);
    }