function(item) {
                var searchTerm = item.data.place;
                for (i=0; i<filters.length; i++)
                {
                    return searchTerm === filters[i]
                }      
               
            }