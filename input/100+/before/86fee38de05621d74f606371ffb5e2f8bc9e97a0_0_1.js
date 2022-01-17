function ChatBar(){

    var that = this;

    this.chatBoxes = new Array();

    this.heartBeatCount= 0;

    this.windowFocus = true;

    this.originalTitle = null;

    this.lastHeartBeatServerdate = 0;

    this.mousemove = false;

    that.startChatSession();

    jQuery(document).ready(function(){

        that.originalTitle = document.title;

        if(AJS.params.remoteUser){

            jQuery.ajax({

                url: getBaseUrl()+"/ajax/chat/chatbar.action",

                success: function(html){

                    jQuery('body').append(html);



                    that.init();

                    

                }

            });

        }

    });    

}