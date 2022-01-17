function() {
                    try {
                        JSAN.use('util.money');
                        var rows = [];
                        var treeitems = obj.treechildren.childNodes;
                        for (var i = 0; i < treeitems.length; i++) {
                            var treeitem = treeitems[i];
                            var treerow = treeitem.firstChild;
                            var treecell = treerow.childNodes[ col_pos ];
                            value = ( { 'value' : treecell ? treecell.getAttribute('label') : '', 'node' : treeitem } );
                            rows.push( value );
                        }
                        rows = rows.sort( function(a,b) { 
                            a = a.value; b = b.value; 
                            if (col.getAttribute('sort_type')) {
                                switch(col.getAttribute('sort_type')) {
                                    case 'date' :
                                        JSAN.use('util.date'); // to pull in dojo.date.locale
                                        a = dojo.date.locale.parse(a,{});
                                        b = dojo.date.locale.parse(b,{});
                                    break;
                                    case 'number' :
                                        a = Number(a); b = Number(b);
                                    break;
                                    case 'money' :
                                        a = util.money.dollars_float_to_cents_integer(a);
                                        b = util.money.dollars_float_to_cents_integer(b);
                                    break;
                                    case 'title' : /* special case for "a" and "the".  doesn't use marc 245 indicator */
                                        a = String( a ).toUpperCase().replace( /^\s*(THE|A|AN)\s+/, '' );
                                        b = String( b ).toUpperCase().replace( /^\s*(THE|A|AN)\s+/, '' );
                                    break;
                                    default:
                                        a = String( a ).toUpperCase();
                                        b = String( b ).toUpperCase();
                                    break;
                                }
                            } else {
                                if (typeof a == 'string' || typeof b == 'string') {
                                    a = String( a ).toUpperCase();
                                    b = String( b ).toUpperCase();
                                }
                            }
                            //dump('sorting: type = ' + col.getAttribute('sort_type') + ' a = ' + a + ' b = ' + b + ' a<b= ' + (a<b) + ' a>b= ' + (a>b) + '\n');
                            if (a < b) return -1; 
                            if (a > b) return 1; 
                            return 0; 
                        } );
                        if (sortDir == 'asc') rows = rows.reverse();
                        while(obj.treechildren.lastChild) obj.treechildren.removeChild( obj.treechildren.lastChild );
                        for (var i = 0; i < rows.length; i++) {
                            obj.treechildren.appendChild( rows[i].node );
                        }
                        if (typeof obj.on_sort == 'function') obj.on_sort();
                    } catch(E) {
                        obj.error.standard_unexpected_error_alert('sorting',E); 
                    }
                }