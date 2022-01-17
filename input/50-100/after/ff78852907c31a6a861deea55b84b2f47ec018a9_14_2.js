function(g) {
                if ( g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname) ) nav += '<li>'+linkto(g.longname, g.name)+'</li>';
                seen[g.longname] = true;
            }