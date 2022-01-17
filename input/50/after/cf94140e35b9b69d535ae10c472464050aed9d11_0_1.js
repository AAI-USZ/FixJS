function(e){
                e.innerHTML = result == 'succeeded' ? '<span class="succeed">Successful</span>'
                : (result == 'aborted' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            }