function(){   
            Session.set('roomId',this._id);
            Meteor.autosubscribe(function(){
                Meteor.subscribe("messages", Session.get('roomId'),function(){  
                    $('#hostChatModal #messageList').fadeIn('fast');
                });
            });
        }