function(){   // assigning the setInterval to locally scoped countdown object
                    countdown--;
                    $('#'+rand_id+'_countdown').empty().append(countdown);
                    if (countdown == 1){
                        clearInterval(countdown.this_interval);
                    };
                }