function(ev) {
            var match = _findMatch(ev),
                win   = jQuery('<div></div>'),
                table = jQuery('<table cellpadding=5px>')
                    .append('<tr><th></th><th></th></tr>'),
                hdata = ['name','modpath','version','context','ifaces'],
                data  = dtable.fnGetData(match.parentNode),
                i;
            for (i=1; i<data.length; i++) {
               table.append('<tr><td>'+hdata[i]+'</td><td>'+data[i]+'</td></tr>');
            }
            win.append(table);

            // Display dialog
            jQuery(win).dialog({
                title: match.innerText+' Metadata',
                width: 'auto'
            });
        }