function(key){
            if(key.which == 13){
                var message = [$('#msg').val(), channelNumber];
                $('#msg').val('');
                socket.emit('sendMessage', message);
            }
        }