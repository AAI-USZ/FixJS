function(extremisPoint){
    this.extremis = extremisPoint;
    if(extremisPoint!=null){
        this.modelReference[1] = extremisPoint.modelReference;
        this.update();            
        this.hasExtremis = true;          	        
    }    
}