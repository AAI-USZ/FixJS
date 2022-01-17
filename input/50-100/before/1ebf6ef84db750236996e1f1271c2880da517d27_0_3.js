function() {
            console.log('connected');
            draft.pushInterval = setInterval(
                function (){
                    if(draft.message)
                        sock.send(JSON.stringify(draft.message));
                    draft.message = null;
                }
            , 50);
            refreshBG();
        }