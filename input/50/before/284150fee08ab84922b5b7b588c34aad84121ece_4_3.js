function(instance, nextInstance){
    return new Point(
            (instance.left + nextInstance.left) / 2, 
            (instance.top  + nextInstance.top ) / 2);
}