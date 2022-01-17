function() { 
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
            
        }