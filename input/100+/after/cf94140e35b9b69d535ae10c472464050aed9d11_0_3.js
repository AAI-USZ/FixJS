function(result) {
        if (null != result && $('runstatus')) {
            $('runstatus').innerHTML = result == 'succeeded' ? '<span class="succeed">Successful</span>'
                : (result == 'aborted' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            $$('.execstatus').each(function(e){
                e.innerHTML = result == 'succeeded' ? '<span class="succeed">Successful</span>'
                : (result == 'aborted' ? '<span class="fail">Killed</span>' : '<span class="fail">Failed</span>');
            });
            if ($('jobInfo_' + this.executionId)) {
                var img = $('jobInfo_' + this.executionId).down('img');
                if (img) {
                    var status = result == 'succeeded' ? '-ok' : result == 'aborted' ? '-warn' : '-error';
                    img.src = this.iconUrl + '-job' + status + ".png";
                }
            }
            if (this.updatepagetitle && !/^\[/.test(document.title)) {
                document.title =
                (result == 'succeeded' ? '[OK] ' : result == 'aborted' ? '[KILLED] ' : '[FAILED] ') + document.title;
            }
            $('cancelresult').hide();
        }
    }