function(){
        var pos = iso.px2pos(this.x,this.y+this.h);
      
        this.z = (~~pos.y+1) * 2;
        if(this.y % 32 == 0 || this.x%64==0)
            renderMap();

    }