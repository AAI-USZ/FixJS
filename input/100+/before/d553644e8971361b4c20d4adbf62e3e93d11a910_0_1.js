function timeout_inform(x, delay){
        var delay_str = delay.toString();
        var rand_id = "timeout_informer" + Math.floor((Math.random() * 1000) + 1);
        var msg = '<div id="'+rand_id+'" class="alert alert-error" style="width: 300px;"><button type="button" class="close" data-dismiss="alert">×</button><div id="timeout_informer_body" style="padding-right: 30px; text-align: center;">';
        var msg_end = '</div></div>';
        var alert_msg = '';

        if (delay == -1){
            alert_msg = 'It appears that there is a problem reaching the server. Please refresh the page again after a while';    
            $('#alert_wrapper').prepend(msg + alert_msg + msg_end);
        } else {
            alert_msg = '<strong>'+x.pretty_fn_name+' timed out!</strong> Retrying in <span id="'+rand_id+'_countdown">'+ delay_str.substr(0, delay_str.length - 3) + '</span>s</br>';
            $('#alert_wrapper').prepend(msg + alert_msg + msg_end);

            $(function(){
                var countdown = parseInt(delay_str.substr(0, delay_str.length - 3));
                countdown.this_interval = setInterval(function(){   // assigning the setInterval to locally scoped countdown object
                    countdown--;
                    $('#'+rand_id+'_countdown').empty().append(countdown);
                    if (countdown == 1){
                        clearInterval(countdown.this_interval);
                    };
                }, 1000);
            });

            setTimeout(function() {
                $("#"+rand_id).fadeOut().empty();
            }, delay-1);
        }
        $('.alert').alert();    // to enable the close functionality of the alert
    }