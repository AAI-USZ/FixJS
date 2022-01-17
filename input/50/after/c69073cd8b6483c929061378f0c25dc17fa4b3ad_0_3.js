function(instance, nextInstance){
    return pv.vector(
            (instance.left + nextInstance.left) / 2, 
            (instance.top  + nextInstance.top ) / 2);
}