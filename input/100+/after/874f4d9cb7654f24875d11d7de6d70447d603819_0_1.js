function pointNear(p, radius,  a,b) {
  /*
   * Given a point p, a "radius", and two more points a and b, return whether
   * the point p is within radius of line ab.
   *
   * We'll use a bounding box approach here.
   *
   *    +---+---------------------+--+
   *    |   | radius              |  |
   *    +---+ - - - - - - - - - - +--+
   *    |   |                  .-'|b |
   *    |         +         ,-'      |
   *    |   |    p \     ,-'      |  |
   *    |           \ ,-'            |
   *    |   |      ,-"            |  |
   *    |       ,-'                  |
   *    |   |,-'                  |  |
   *    +---+ - - - - - - - - - - +--+
   *    |   | a                   |  |
   *    +---+---------------------+--+
   *
   * Points A and B form an "inner" bounding box (dashed line). This is padded
   * by 'radius' units on all sides to form an "outer" bounding box (solid
   * line). If p lies outside of this outer bounding box, there is no
   * possibility of a collision. If p lies inside the bounding box, then a
   * standard point-line-distance test is used.
   *
   * This estimate will give false positives for the two corners nearest to b
   * and a where p lies inside the square but just outside the quarter-circle.
   */
  var x=p[0],
      y=p[1];
    if (x < Math.min(a[0], b[0])-radius ||    // left
        x > Math.max(a[0], b[0])+radius ||    // right
        y < Math.min(a[1], b[1])-radius ||    // top
        y > Math.max(a[1], b[1])+radius) {    // bottom
      // p lies outside the bounding box for this line segment
      return false;
    }

    var denominator = Math.sqrt( (b[0]-a[0])*(b[0]-a[0]) + (b[1]-a[1])*(b[1]-a[1]) );
    if (denominator==0) { return true; }
    // see http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html
    return (Math.abs( (b[0]-a[0])*(a[1]-p[1]) - (a[0]-p[0])*(b[1]-a[1]) ) /
            denominator) <= radius;

}