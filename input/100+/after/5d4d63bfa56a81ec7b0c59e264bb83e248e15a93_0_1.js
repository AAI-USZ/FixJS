function() {

        $(this).toggleClass('minimized');

        if ($('.chat-container .messages').height()=='0') {

          $('.chat-container').animate({height: $this.roomHeight*.4}, 1000)

          $('.chat-container .messages').animate({height: $this.roomHeight*.4-38-25}, 1000, function() {

            $('.chat-container .messages').scrollTop(99999);          

          })

          $('.chat-container .chatHeader').animate({bottom: $this.roomHeight*.4-25}, 1000)

        }

        else {

          $('.chat-container').animate({height: 38+25}, 1000)

          $('.chat-container .messages').animate({height: 0}, 1000)

          $('.chat-container .chatHeader').animate({bottom: 38}, 1000)

        }

      }