function renderNeighborhood(node) {
        var line = '<table id="neighborTable"><tr>';
        if (node.ins.length > 0) {
            line = line + '<td width="30%" style="vertical-align:top">';
            for (var ii in node.ins) {
                var xi = node.ins[ii];
                var id = xi.id;
                var name = xi.name;
                var relationship = '';
                if (xi.via!=null) {
                    relationship = xi.via.name;
                }
                var r = '<p class="neighborhooditem neighbor_summary_in"><a href="/node/' + id +'">' + name + '</a> -> ' + relationship + '</p>';
                line = line + r;
            }
            line = line + '</td>';
        }

        var numProperties = 0;
        for (var id in node.prop) {
            if (id == 'content') continue;
            if (id == 'name') continue;
            if (id == 'id') continue;
            numProperties++;
        }
        
        if (numProperties > 0) {
            line = line + '<td width="30%" style="vertical-align:top">';
            for (var id in node.prop) {   
                if (id == 'content') continue;
                if (id == 'name') continue;
                if (id == 'id') continue;
                
                var value = node.prop[id];
                var r = '<p class="neighborhooditem neighbor_summary_prop"><a href="/property/' + id +'">' + id + '</a>: ' + value + '</p>';
                line = line + r;
            }
            line = line + '</td>';
        }
        if (node.outs.length > 0) {
            line = line + '<td width="30%" style="vertical-align:top">';
            for (var ii in node.outs) {
                var xi = node.outs[ii];
                var id = xi.id;
                var name = xi.name;
                var relationship = '';
                if (xi.via!=null) {
                    relationship = xi.via.name;
                }
                var r = '<p class="neighborhooditem neighbor_summary_out">' + relationship + ' -> <a href="/node/' + id +'">' + name + '</a></p>';
                line = line + r;
            }
            line = line + '</td>';
        }
        line = line + '</tr></table>';
        return line;
        
    }