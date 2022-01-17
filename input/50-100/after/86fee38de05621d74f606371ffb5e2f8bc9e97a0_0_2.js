function(){

            var status = jQuery(this).val();

            jQuery.ajax({

                url: AJS.contextPath()+"/chat/setstatus.action",

                cache: false,

                data: {

                    status:  that.configurationBox.find('.chat-options select[name=status]').val(),

                    showCurrentSite:  that.configurationBox.find('.chat-options #chat-site:checked').size()

                },

                dataType: "json",

                success: function(data){

                    that.setStatus(status);

                }

            });

        }