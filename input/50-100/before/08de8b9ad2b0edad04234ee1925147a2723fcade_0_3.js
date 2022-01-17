function(direction) {
       
       switch(direction) {
           case d_down:
               animation.y++;
               break;
           case d_up:
               animation.y--;
               break;
           case d_left:
               animation.x--;
               break;
           case d_right:
               animation.x++;
               break;
           default:
			   break;
       }
       if(oldState != direction) {
           this.setDirection(direction);
           oldState = direction;
       }
   }