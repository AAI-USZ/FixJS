function(corner, index){
                corner = corners[index] = corner.rotate(angle);
                if(min == null){
                    min = pv.vector(corner.x, corner.y);
                } else {
                    if(corner.x < min.x){
                        min.x = corner.x;
                    }
                    
                    if(corner.y < min.y){
                        min.y = corner.y;
                    }
                }
                
                if(max == null){
                    max = pv.vector(corner.x, corner.y);
                } else {
                    if(corner.x > max.x){
                        max.x = corner.x;
                    }
                    
                    if(corner.y > max.y){
                        max.y = corner.y;
                    }
                }
            }