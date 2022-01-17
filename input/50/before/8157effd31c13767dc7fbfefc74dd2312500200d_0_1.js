function(extremisPoint){
    this.extremis = extremisPoint;
    if(extremisPoint){
        this.modelReference[1] = extremisPoint.modelReference;
        this.update();            
        this.hasExtremis = true;          	        
    }    
}