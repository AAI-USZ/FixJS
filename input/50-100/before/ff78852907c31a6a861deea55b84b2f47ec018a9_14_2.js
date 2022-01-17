function(g) {
                if ( g.kind !== 'typedef' && !hasOwnProperty.call(seen, g.longname) ) nav += '<li>'+linkto(g.longname, g.name)+'</li>';
                seen[g.longname] = true;
            }