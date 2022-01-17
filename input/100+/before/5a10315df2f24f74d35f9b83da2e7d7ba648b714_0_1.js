function isSelect(context) {
  var value = context.current();
  return typeof value === "object" && value.isSelect === true;    
}