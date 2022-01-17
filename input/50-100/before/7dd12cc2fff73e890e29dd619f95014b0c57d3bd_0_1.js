function Geometry (o, val) {
    console.log(o)
    console.log(val)
    var split = val.split("x");
    o.size = {
        width:  parseInt(split[0], 10)
      , height: parseInt(split[1], 10)
    }
  }