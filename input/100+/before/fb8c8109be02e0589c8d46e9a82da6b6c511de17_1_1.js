function(ev) {
            debug.info('View Metadata context event:');
            var match = _findMatch(ev);
            var win = jQuery('<div></div>');
            var table = jQuery('<table cellpadding=5px>');
            table.append('<tr><th></th><th></th></tr>')
            var hdata = ['name','modpath','version','context','ifaces'];
            var data = dtable.fnGetData(match.parentNode);
            for (var i=1; i<data.length; i++) {
               table.append('<tr><td>'+hdata[i]+'</td><td>'+data[i]+'</td></tr>');
            }
            win.append(table);
            
            // Display dialog
            jQuery(win).dialog({
                title: match.innerText+' Metadata',
                width: 'auto'
            });
        }