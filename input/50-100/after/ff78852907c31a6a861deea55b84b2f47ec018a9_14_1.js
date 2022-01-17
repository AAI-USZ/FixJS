function(e) {
                if ( !hasOwnProp.call(seen, e.longname) ) nav += '<li>'+linkto( e.longname, e.name.replace(/(^"|"$)/g, '') )+'</li>';
                seen[e.longname] = true;
            }