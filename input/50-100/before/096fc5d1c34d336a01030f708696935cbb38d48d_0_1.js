function(data)
           {
               var frags = new Array();
               for(f in data)
                {
                    frags.push(new Fragment(data[f].id, data[f].name, 
                                            data[f].desc, data[f].length));
                }
                _suc(frags);
           }