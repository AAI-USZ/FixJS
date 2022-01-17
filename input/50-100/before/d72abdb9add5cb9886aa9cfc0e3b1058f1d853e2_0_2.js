function(event) {
                event.stop();
                if($(this).get('xhrrunning')){
                    $(this).erase('xhrrunning');
                }else{
                    $(this).set('xhrrunning',true);
                    return;
                }
                $('content').addClass('contentLoading');
                //spinner.startSpin();
                History.push(this.get('href'));
            }