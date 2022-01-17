function(x, y, radius)

{

    var result = [];

    for (var x1 = x - radius; x1 <= x + radius; x1++)

    {

       for (var y1 = y - radius; y1 <= y + radius; y1++)

       {

           var dist = this.getDistance(x, y, x1, y1);



           if (dist != null && dist < radius)

           {

               result.push(this.getContents(x1, y1));

           }

       }

    }

    return result;

}