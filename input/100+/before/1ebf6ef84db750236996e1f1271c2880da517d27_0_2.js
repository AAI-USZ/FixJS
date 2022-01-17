function refreshFG(){//{{{
        if(canvasBackground == null)
            refreshBG();

        function selected(type, idx){
            var rt = false;
            try{
                var selection = draft.activeTool.selected[type];
                if(typeof(selection)=='number') 
                    rt = (selection==idx)
                else
                    rt = selection.indexOf(idx)!=-1;
            }catch(err){}
            return rt;
        }


        with(draft.context){
            drawImage(canvasBackground,0,0);
            
            defaultStyle  ="rgb(255,255,255)";
            highlightStyle="rgb(64,128,64)";

            strokeStyle = defaultStyle;
            lineWidth   = 5;

            //Draw circles first, they might eventually fill with colors?
            draft.objects.circles.forEach(function(c,idx,array){
                var p1 = draft.objects.points[c.p1];
                var p2 = draft.objects.points[c.p2];
                var r = dist(p1,p2);
                beginPath();
                if(selected("circles",idx))
                    strokeStyle=highlightStyle;
                else
                    strokeStyle = defaultStyle;
                arc(p1.x,p1.y,r,0,Math.PI*2,true);
                stroke();
            });

            //Lines 2nd        
            draft.objects.lines.forEach(function(ln,idx,array){
                p1 = draft.objects.points[ln.p1];
                p2 = draft.objects.points[ln.p2];
                beginPath();
                if(selected("lines",idx))
                    strokeStyle=highlightStyle;
                else
                    strokeStyle = defaultStyle;
                moveTo(p1.x,p1.y);
                lineTo(p2.x,p2.y);
                stroke();
            });

            //Draw Points last, so that they are on top of everything.
            lineWidth = 10;
            defaultStyle = "rgb(128,128,255)";
            draft.objects.points.forEach(function(pt,idx,array){
                beginPath();
                if(selected("points",idx))
                    strokeStyle=highlightStyle;
                else
                    strokeStyle = defaultStyle;
                moveTo(pt.x-.5,pt.y);
                lineTo(pt.x+.5,pt.y);
                stroke();
            });
        }
    }//}}}