function drawModel(m){
       
        var startX = m.vector.x+m.vector.z;
        var startY = m.vector.y+m.vector.z;
        var faces = m.faces;
        faces.sort(function(f0,f1){
            //sort method by veer Note: possible issues due to lack of full perspective implementation. 
            var v0 = f0.verticies;
            var v1 = f1.verticies;
            var sum_z0 = 0;
            for (var x = 0; x < v0.length; ++x)
                sum_z0 += v0[x].z;
            var sum_z1 = 0;
            for (var x = 0; x < v1.length; ++x)
                sum_z1 += v1[x].z;
            return sum_z0 - sum_z1;      
            
     
        });
        
        
        for (var i = 0; i < faces.length; i++) {
        
            if (POS3D.Vector.dotProduct(faces[i].getNormal,planeNormal) < 0)
                continue;
         
          
            context.fillStyle  = faces[i].color;
            context.translate(startX, startY);
            context.beginPath();
            var v = faces[i].verticies;
            for(var x = 0; x < v.length; x++){
                
                context.lineTo(v[x].x,v[x].y); 
        
                
 
            }
         
            context.fillText("Priority:"+i,350,50+(i*12));  
        
            context.fill();

            context.closePath();  
            
        
            context.translate(-startX, -startY);

        }

    }