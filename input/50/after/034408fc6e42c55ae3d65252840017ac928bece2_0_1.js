function(ind, vertex){
                       if(selectedFeature.geometry.containsPoint(vertex))
                       {
                           listResult = true;
                           return false;
                       }
                   }