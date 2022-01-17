function(item) {
                var searchTerm = item.data.place;
                var passed = false
                for (i=0; i<filters.length; i++)
                {
                    if (searchTerm === filters[i]) {
                        passed = true;
                        
                    }
                }      
               
                return passed;
 
            }