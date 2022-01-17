function(ctx){
            console.log("Line draw")
            console.log(this.selected.points)
            console.log(this.dragTarget)
            if(this.selected.points[0]==null) return false;
            var p1 = draft.objects.points[this.selected.points[0]]
            var p2 = this.selected.points[1];
            
            with(ctx){
            if(p2==null){
                p2=draft; 
                strokeStyle = "rgb(255,255,255)";
            }else{
                p2=draft.objects.points[p2]
                strokeStyle = "rgb(64,128,64)";
            }
                lineWidth=3; 
                beginPath();
                moveTo(p1.x,p1.y);
                lineTo(p2.x,p2.y);
                stroke();
            }
        }