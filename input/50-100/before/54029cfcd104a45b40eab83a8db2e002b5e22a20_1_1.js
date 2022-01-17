function(data){
                        var address = location.protocol+'//'+location.host+data.url;
                        if(history.replaceState)
                            history.replaceState({},q.name(),address);
                        $.noty.close(vm.save_noty);
                        noty({text:'Saved.',type:'success',timeout: 1000, layout: 'topCenter'});
                    }