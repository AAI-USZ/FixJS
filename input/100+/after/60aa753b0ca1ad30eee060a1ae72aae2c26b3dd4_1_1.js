function callback_example(){
    var cw = Raphael.colorwheel($("#test .colorwheel")[0],150);
    cw.input($("#test input")[0]);
    return cw;
  }