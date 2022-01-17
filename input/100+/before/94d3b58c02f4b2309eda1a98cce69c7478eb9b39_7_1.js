function() {
        for (var i in $$.fjs) {
            if (typeof($$.fjs[i]) == 'object' && $$.fjs[i].register && typeof($$.fjs[i].register) == 'function') {
                var okToInit = true;
                if ($$.fjs[i].requires && typeof($$.fjs[i].requires) == 'object') {
                    for (var p=0,c=$$.fjs[i].requires.length, r=$$.fjs[i].requires; p<c; p++) {
                        if (!$$.fjs[r[p]]) {
                            $$.fjs.error('FairyJS plugin "'+i+'" requires plugin "'+r[p]+'" which is not loaded');
                            okToInit = false;
                        }
                    }
                }
                if (okToInit) {
                    $$.fjs[i].register();
                    $.fjs.log('Activated plugin "'+i+'"');
                } else {
                    $.fjs.error('Plugin "'+i+'" falied to intialize due to missing dependencies');
                }
            }
        }
        $$.fjs.log('FairyJS core intialized');
    }