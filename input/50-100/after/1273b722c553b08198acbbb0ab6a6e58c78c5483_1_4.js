function(message){
            $("#data_received").append("<br /> \r\n" + message);
            
            //log the message that was received
            logTime();
            log += " " + message;
            
            //scroll down to the last thing in box of receieved messages
            var objDiv = document.getElementById("data_received");
            objDiv.scrollTop = objDiv.scrollHeight;
        }