function get_obstacle_color(i) {
    var rgb = obstacles.color ? obstacles.color[i] : options.default_obstacle_color;
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  }