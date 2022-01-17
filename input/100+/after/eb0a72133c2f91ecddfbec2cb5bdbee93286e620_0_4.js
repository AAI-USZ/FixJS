function() {
    var minpoint;
    if(this.sides.length == 0)
    {
      minpoint = new CSG.Vector2D(0,0);
    }
    else
    {
      minpoint=this.sides[0].vertex0.pos;
    }
    var maxpoint=minpoint;
    this.sides.map(function(side){
      minpoint = minpoint.min(side.vertex0.pos);
      minpoint = minpoint.min(side.vertex1.pos);
      maxpoint = maxpoint.max(side.vertex0.pos);
      maxpoint = maxpoint.max(side.vertex1.pos);
    });
    return [minpoint, maxpoint];  
  }