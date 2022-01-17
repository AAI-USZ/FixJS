function(e){
                e.innerHTML = result == 'true' ? '<span class="succeed">Successful</span>'
                : (result == 'cancelled' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            }