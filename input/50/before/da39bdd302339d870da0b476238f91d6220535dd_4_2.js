function(n) {
                if ( !hasOwnProperty.call(seen, n.longname) ) nav += '<li>'+linkto(n.longname, n.name)+'</li>';
                seen[n.longname] = true;
            }