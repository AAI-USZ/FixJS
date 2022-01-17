function(){
    const TICK = 60.0;
    var model = new POS3D.Model(new POS3D.Vector(0,0,100),
        [
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(50, 50, 0),new POS3D.Vector(50, 0, 0)],"#FF0000"),
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(0, 50, 0),new POS3D.Vector(50, 50, 0)],"#00FFFF"),
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(0, 50, 50),new POS3D.Vector(0, 50, 0)],"#0000FF"),
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(0, 0, 50),new POS3D.Vector(0, 50, 50)],"#0000A0"),
        new POS3D.Face([new POS3D.Vector(0, 50, 0),new POS3D.Vector(50, 50, 50),new POS3D.Vector(50, 50, 0)],"#ADD8E6"),
        new POS3D.Face([new POS3D.Vector(0, 50, 0),new POS3D.Vector(0, 50, 50),new POS3D.Vector(50, 50, 50)],"#800080"),   
        new POS3D.Face([new POS3D.Vector(50, 0, 0),new POS3D.Vector(50, 50, 0),new POS3D.Vector(50, 50, 50)],"#FFFF00"),  
        new POS3D.Face([new POS3D.Vector(0, 50, 0),new POS3D.Vector(50, 50, 50),new POS3D.Vector(50, 0, 50)],"#00FF00"),  
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(50, 0, 0),new POS3D.Vector(50, 0, 50)],"#FF00FF"),
        new POS3D.Face([new POS3D.Vector(0, 0, 0),new POS3D.Vector(50, 0, 50),new POS3D.Vector(0, 0, 50)],"#FF00FF"), 
        new POS3D.Face([new POS3D.Vector(0, 0, 50),new POS3D.Vector(50, 0, 50),new POS3D.Vector(50, 50, 50)],"#000000"),   
        new POS3D.Face([new POS3D.Vector(0, 0, 50),new POS3D.Vector(50, 50, 50),new POS3D.Vector(0, 50, 50)],"#FFA500")   
        ]
        );
        
    var canvasWidth;
    var canvasHeight;
    var context;
    var canvasX;
    var canvasY; 
    var planeNormal;
    var pov;
    
    return {
        init: function() { 
            var canvas = document.getElementById("renderCanvas");
            canvasWidth = $('#renderCanvas').width();
            canvasHeight = $('#renderCanvas').height();     
            canvasX = $('#renderCanvas').offset().left;
            canvasY = $('#renderCanvas').offset().top;
            context = canvas.getContext('2d');
            setTimeout(POS3D.Render.loop, (1/TICK) * 1000);
            planeNormal = new POS3D.Vector(0,0,0);
       
            model.transform.translate(100, 100, 0);
        //model.getTransform.scale(50,50, 1);   
        //  pov = new POS3D.Matrix();
        // poVector(0, 0, 50)
            
        },
        loop: function() { 
            POS3D.Render.update();
            POS3D.Render.draw();
            setTimeout(POS3D.Render.loop, (1/TICK) * 1000);
        },
        update: function() {
  
          //  model.transform.rotateY(0.017);
         //   model.transform.rotateX(-0.017);
            
        },
        draw: function(){ 
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle= "#C0C0C0";
            context.fillRect(0,0,canvasWidth,canvasHeight);
            if(model != null){
                model.transformFaces();
                drawModel(model);
                
            }
        }
    };
    
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
    function projectionX(pov,vX){
        return (pov.getZ() * (vX.getX()-pov.getZ())) / (pov.getZ() + vX.getZ()) + pov.getX();
    }
    function projectionY(pov,vX){
        return (pov.getZ() * (vX.getY()-pov.getY())) / (pov.getZ() + vX.getZ()) + pov.getY();
    }   
    function toRad(Value) {
        /** Converts numeric degrees to radians */
        return Value * Math.PI / 180;
    }
 

}