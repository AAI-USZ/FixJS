function(event) {
        var self = this;
        if ($(this).val().length) {
          if (keydownEnter && event.keyCode === 13) {
            var message = $(this).val();
            // Handle IRC commands
            if (message.substr(0, 1) === '/') {
              var commandText = message.split(' ');
              irc.handleCommand(commandText);
            } else {
              // Send the message
              console.log(irc.chatWindows.getActive().get('name'));
              irc.socket.emit('say', {target: irc.chatWindows.getActive().get('name'), message:message});
            }
            $(this).val('');
            $('#chat-button').addClass('disabled');
          } else if (event.keyCode == 9) {
            var searchRe;
            var match = false;
            var channel = irc.chatWindows.getActive();
            var sentence = $('#chat-input').val().split(' ');
            var partialMatch = sentence.pop();
            var users = channel.userList.getUsers();
            var userIndex=0;
            searchRe = new RegExp(self.partialMatch, "i");
            if(self.partialMatch === undefined) {
              self.partialMatch = partialMatch;
              searchRe = new RegExp(self.partialMatch, "i");
            } else if(partialMatch.search(searchRe) !== 0){
              self.partialMatch = partialMatch;
              searchRe = new RegExp(self.partialMatch, "i");
            } else {
              if (sentence.length === 0) {
                userIndex = users.indexOf(partialMatch.substr(0, partialMatch.length-1));
              } else {
                userIndex = users.indexOf(partialMatch);
              }
            }
            //Cycle through userlist from last user or beginning
            for (var i=userIndex; i<users.length; i++) {
              var user = users[i] || '';
              //Search for match
              if (self.partialMatch.length > 0 && user.search(searchRe) === 0) {
                //If no match found we continue searching
                if(user === partialMatch || user === partialMatch.substr(0, partialMatch.length-1)){
                  continue;
                }
                //If we find a match we return our match to our input
                sentence.push(user);
                match = true;
                //We decide whether or not to add colon
                if (sentence.length === 1) {
                  $('#chat-input').val(sentence.join(' ') +  ":");
                } else {
                  $('#chat-input').val(sentence.join(' '));
                }
                //We break from our loop
                break;
              } else if(i === users.length-1 && match === false) {
                sentence.push('');
                $('#chat-input').val(sentence.join(' '));
              }
            }
        } else {
            $('#chat-button').removeClass('disabled');
          }
        } else {
          $('#chat-button').addClass('disabled');
        }
        isEnter = false;
      }