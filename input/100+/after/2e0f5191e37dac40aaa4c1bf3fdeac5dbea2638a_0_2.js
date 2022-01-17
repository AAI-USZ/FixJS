function(a,b) { 
                            if (a.sort_value) {
                                a = a.sort_value;
                                b = b.sort_value;
                            } else {
                                a = a.value;
                                b = b.value;
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
                            }
                            //dump('sorting: type = ' + col.getAttribute('sort_type') + ' a = ' + a + ' b = ' + b + ' a<b= ' + (a<b) + ' a>b= ' + (a>b) + '\n');
                            if (a < b) return -1; 
                            if (a > b) return 1; 
                            return 0; 
                        }