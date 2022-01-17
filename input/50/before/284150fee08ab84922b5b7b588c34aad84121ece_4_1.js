function(instance){
    return new Point(
                instance.left + (instance.width  || 0) / 2,
                instance.top +  (instance.height || 0) / 2);
}