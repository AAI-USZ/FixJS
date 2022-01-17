function posfn(e, ele){
  var setpos=new pos();
  setpos.x=e.clientX-(ele.offsetLeft-document.documentElement.scrollLeft);
  setpos.y=e.clientY-(ele.offsetTop-document.documentElement.scrollTop);
  console.log(e.clientY+":"+e.screenY+":"+ele.offsetTop+":"+document.documentElement.scrollTop+":"+ele.scrollHeight+"\n");
  return setpos;
}