function refreshObjectLayer(forceLowerLevel){//{{{
        if(TRACE_LAYERS)console.log("Object Layer: "+forceLowerLevel)
        if(forceLowerLevel)
            refreshGridLayer();


        with(draft.context){
            drawImage(gridLayer,0,0);
            
            strokeStyle = "rgb(255,255,255)";
            lineWidth   = 5;
            beginPath() 
            //Draw Objects {{{ 
            //Draw circles first, they might eventually fill with colors?
            draft.objects.circles.forEach(function(c,idx,array){
                var p1 = draft.objects.points[c.p1];
                var p2 = draft.objects.points[c.p2];
                var r = dist(p1,p2);
                arc(p1.x,p1.y,r,0,Math.PI*2,true);
            });

            //Lines 2nd        
            draft.objects.lines.forEach(function(ln,idx,array){
                p1 = draft.objects.points[ln.p1];
                p2 = draft.objects.points[ln.p2];
                moveTo(p1.x,p1.y);
                lineTo(p2.x,p2.y);
            });
            stroke();

            //Draw Points last, so that they are on top of everything.
            beginPath() 
            lineWidth = 10;
            strokeStyle = "rgb(128,128,255)";
            draft.objects.points.forEach(function(pt,idx,array){
                moveTo(pt.x-.5,pt.y);
                lineTo(pt.x+.5,pt.y);
            });
            stroke();
            //}}}
        //    objectLayer.src = canvas.toDataURL("image/png");
        }
        
    }//}}}