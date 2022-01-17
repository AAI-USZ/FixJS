function() {
                var q = this;
                var vm = this;

                if(!this.save_noty)
                {
                    this.save_noty = noty({
                        text: 'Saving...', 
                        layout: 'topCenter', 
                        type: 'information',
                        timeout: 0, 
                        speed: 150,
                        closeOnSelfClick: false, 
                        closeButton: false
                    });
                }
                
                $.post(
                    '/question/'+this.id+'/'+slugify(this.name())+'/',
                    {json: JSON.stringify(this.save()), csrfmiddlewaretoken: getCookie('csrftoken')}
                )
                    .success(function(data){
                        var address = location.protocol+'//'+location.host+data.url;
                        if(history.replaceState)
                            history.replaceState({},q.name(),address);
                        $.noty.close(vm.save_noty);
                        noty({text:'Saved.',type:'success',timeout: 1000, layout: 'topCenter'});
                    })
                    .error(function(response,type,message) {
                        if(message=='')
                            message = 'Server did not respond.';

                        noty({
                            text: 'Error saving question:\n\n'+message,
                            layout: "topLeft",
                            type: "error",
                            textAlign: "center",
                            animateOpen: {"height":"toggle"},
                            animateClose: {"height":"toggle"},
                            speed: 200,
                            timeout: 5000,
                            closable:true,
                            closeOnSelfClick: true
                        });
                    })
                    .complete(function() {
                        window.onbeforeunload = null;
                        $.noty.close(vm.save_noty);
                        vm.save_noty = null;
                    })
                ;
            },this).extend({throttle:1000}