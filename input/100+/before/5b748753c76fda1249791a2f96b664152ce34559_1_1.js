function(ch){
            if(ch instanceof Region){
                ch = ch.computeCenterOfMass();                    
            } else {
                var m = ch.mass;
                mass += m;
                p.addSelf(ch.position
                    .clone().multiplyScalar(m));
            }
        }