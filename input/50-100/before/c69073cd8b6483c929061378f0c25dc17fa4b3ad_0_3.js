function(instance){
    var midAngle  = instance.startAngle + (instance.angle / 2);
    var midRadius = (instance.outerRadius + instance.innerRadius) / 2;
    var dotLeft   = instance.left + midRadius * Math.cos(midAngle);
    var dotTop    = instance.top  + midRadius * Math.sin(midAngle);
    
    return new Point(dotLeft, dotTop);
}