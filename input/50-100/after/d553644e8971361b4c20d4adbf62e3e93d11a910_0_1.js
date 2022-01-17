function(){
                var countdown = parseInt(delay_str.substr(0, delay_str.length - 3));
                countdown.this_interval = setInterval(function(){   // assigning the setInterval to locally scoped countdown object
                    countdown--;
                    $('#'+rand_id+'_countdown').empty().append(countdown);
                    if (countdown == 1){
                        clearInterval(countdown.this_interval);
                    };
                }, 1000);
            }