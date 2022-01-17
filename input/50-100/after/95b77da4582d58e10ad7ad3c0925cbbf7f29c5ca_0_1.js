function posfn(e, ele){
  var setpos=new pos();
  setpos.x=e.clientX-(ele.offsetLeft-document.documentElement.scrollLeft);
  setpos.y=e.clientY-(ele.offsetTop-document.documentElement.scrollTop);
  return setpos;
}