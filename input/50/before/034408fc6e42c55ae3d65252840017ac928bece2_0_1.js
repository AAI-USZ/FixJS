function(ind, vertex){
                       if(selectedFeature.geometry.intersects(vertex))
                       {
                           listResult = true;
                           return false;
                       }
                   }