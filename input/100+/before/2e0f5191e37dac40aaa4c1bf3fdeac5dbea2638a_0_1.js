function(params,treerow) {
        var obj = this;
        var s = '';

        if (typeof params.map_row_to_column == 'function' || typeof this.map_row_to_column == 'function') {

            for (var i = 0; i < this.columns.length; i++) {
                var treecell;
                if (typeof treerow.childNodes[i] == 'undefined') {
                    treecell = document.createElement('treecell');
                    treerow.appendChild( treecell );
                } else {
                    treecell = treerow.childNodes[i];
                }
                
                if ( this.columns[i].editable == false ) { treecell.setAttribute('editable','false'); }
                var label = '';

                // What skip columns is doing is rendering the treecells as blank/empty
                if (params.skip_columns && (params.skip_columns.indexOf(i) != -1)) {
                    treecell.setAttribute('label',label);
                    s += ('treecell = ' + treecell + ' with label = ' + label + '\n');
                    continue;
                }
                if (params.skip_all_columns_except && (params.skip_all_columns_except.indexOf(i) == -1)) {
                    treecell.setAttribute('label',label);
                    s += ('treecell = ' + treecell + ' with label = ' + label + '\n');
                    continue;
                }
    
                if (typeof params.map_row_to_column == 'function')  {
    
                    label = params.map_row_to_column(params.row,this.columns[i]);
    
                } else if (typeof this.map_row_to_column == 'function') {
    
                    label = this.map_row_to_column(params.row,this.columns[i]);
    
                }
                if (this.columns[i].type == 'checkbox') { treecell.setAttribute('value',label); } else { treecell.setAttribute('label',label ? label : ''); }
                s += ('treecell = ' + treecell + ' with label = ' + label + '\n');
            }
        } else if (typeof params.map_row_to_columns == 'function' || typeof this.map_row_to_columns == 'function') {

            var labels = [];

            if (typeof params.map_row_to_columns == 'function') {

                labels = params.map_row_to_columns(params.row,this.columns);

            } else if (typeof this.map_row_to_columns == 'function') {

                labels = this.map_row_to_columns(params.row,this.columns);

            }
            for (var i = 0; i < labels.length; i++) {
                var treecell;
                if (typeof treerow.childNodes[i] == 'undefined') {
                    treecell = document.createElement('treecell');
                    treerow.appendChild(treecell);
                } else {
                    treecell = treerow.childNodes[i];
                }
                if ( this.columns[i].editable == false ) { treecell.setAttribute('editable','false'); }
                if ( this.columns[i].type == 'checkbox') {
                    treecell.setAttribute('value', labels[i]);
                } else {
                    treecell.setAttribute('label',typeof labels[i] == 'string' || typeof labels[i] == 'number' ? labels[i] : '');
                }
                s += ('treecell = ' + treecell + ' with label = ' + labels[i] + '\n');
            }

        } else {

            throw('No row to column mapping function.');
        }
        this.error.sdump('D_LIST',s);
    }