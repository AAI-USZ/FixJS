function(m) {
                if ( !hasOwnProperty.call(seen, m.longname) ) nav += '<li>'+linkto(m.longname, m.name)+'</li>';
                seen[m.longname] = true;
            }