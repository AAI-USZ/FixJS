function(key){
            if(key.which == 13){
                var message = $('#msg').val();
                socket.emit('sendMessage', message, channelNumber);
                $('#msg').val('');
            }
        }