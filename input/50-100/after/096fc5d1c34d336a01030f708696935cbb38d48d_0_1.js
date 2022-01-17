function(data)
           {
               var frags = new Array();
               for(f in data)
                {
                    frags.push(new Fragment(data[f]));
                }
                _suc(frags);
           }