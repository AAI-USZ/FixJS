function checkEnter(e){
 e = e || event;
 return (e.keyCode || event.which || event.charCode || 0) !== 13;
}