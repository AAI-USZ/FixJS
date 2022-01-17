function(){
        
        animation.animateActiveship();
        
        if (animation.animating){
            if(animation.animationloopdelay > 0){
                animation.animationloopdelay--;
            }else{
                animation.animating();
            }
        }
    
        setTimeout(animation.animationLoop, 30);
    }