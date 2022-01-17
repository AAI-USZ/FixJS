function init() {
  document.getElementById('stop').style.display="";

  //Init IA
  ia_init();

  //Hide code panel
  var e1=document.getElementById('code');
  var e2=document.getElementById('start')
  e1.parentNode.removeChild(e1);
  e2.parentNode.removeChild(e2);

  //Create initial population
  for (var i=0; i<initialWater; i++) {
    var w=new Water();
    w.element.move(Math.random()*width,Math.random()*height);
   // w.element.move(200,100);
  }
  for (var i=0; i<initialGreen; i++) {
    var e=new Green();
    e.element.move(Math.random()*width,Math.random()*height);
    e.element.rotate(Math.random()*360);
 //   e.element.move(200,200);
 //   e.element.rotate(5);
  }
  for (var i=0; i<initialRed; i++) {
    var r=new Red();
    r.element.move(Math.random()*width,Math.random()*height);
  }

  //Initialize game mechanics
  initGod();

  //Run updater once to ensure everything is going on properly
  lastUpdateTime=time();
  updateWide();
}