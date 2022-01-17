function(){
        var pos = iso.px2pos(this.x,this.y+this.h);
        pos.x = ~~pos.x;
        pos.y = ~~pos.y;
        //If player coordiantes didnt changed return
        if(this.position.x == pos.x || this.position.y == pos.y) return;
      
        //update player coordiantes
        this.position.x = pos.x;
        this.position.y = pos.y;
        this.z = (~~pos.y+1) * 2;
        //update map
        bg.render();
        renderObjects();
    }