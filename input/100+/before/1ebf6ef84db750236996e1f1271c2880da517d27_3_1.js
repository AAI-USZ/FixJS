function(ctx){
            if(this.selected.points[0]==null) return false;
            if(this.dragTarget==null)return false;
            var p1 = draft.objects.points[this.selected.points[0]]
            var p2 = draft;
            with(ctx){
                moveTo(p1.x,p1.y);
                lineTo(p2.x,p2.y);
                stroke();
            }
            return true;
        }