function(result) {
        if (null != result && $('runstatus')) {
            $('runstatus').innerHTML = result == 'true' ? '<span class="succeed">Successful</span>'
                : (result == 'cancelled' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            $$('.execstatus').each(function(e){
                e.innerHTML = result == 'true' ? '<span class="succeed">Successful</span>'
                : (result == 'cancelled' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            });
            if ($('jobInfo_' + this.executionId)) {
                var img = $('jobInfo_' + this.executionId).down('img');
                if (img) {
                    var status = result == 'true' ? '-ok' : result == 'cancelled' ? '-warn' : '-error';
                    img.src = this.iconUrl + '-job' + status + ".png";
                }
            }
            if (this.updatepagetitle && !/^\[/.test(document.title)) {
                document.title =
                (result == 'true' ? '[OK] ' : result == 'cancelled' ? '[KILLED] ' : '[FAILED] ') + document.title;
            }
            $('cancelresult').hide();
        }
    }