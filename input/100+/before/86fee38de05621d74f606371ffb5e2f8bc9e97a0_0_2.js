function(){

        

        if(AJS.params.remoteUser){

            

            jQuery.ajax({

                url: getBaseUrl()+"/chat/start.action",

                cache: false,

                dataType: "json",

                data: {

                    currentUrl : window.location.href,

                    currentTitle: document.title

                },

                success: function(data) {

                    that.lastHeartBeatServerdate = data.lr;

                    if(typeof(data.chatboxes) != "undefined"){

                        that.retrieveChatMessages(data.chatboxes);

                    }

                    setInterval(function(){

                        that.chatHeartbeat();

                    }, 650);

                }

            });

            jQuery([window, document]).blur(function(){

                that.windowFocus = false;

            }).focus(function(){

                that.windowFocus = true;

                document.title = that.originalTitle;

            });

        }

    }