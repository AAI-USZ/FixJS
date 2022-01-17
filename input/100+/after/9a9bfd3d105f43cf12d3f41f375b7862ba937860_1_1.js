function Color (value) {
  var val
    , i;
  
  value = value.replace(/\s\s*/g, '');
  
  for (i = 0; i < stringParsers.length; i++) {
    if ((val = stringParsers[i].re.exec(value)) !== null) {
      val = stringParsers[i].parse(val);
      break;
    }
  }
  
  val = tire.slice.call(val, 0);
  
  val[0] = (val[0] < 0 || isNaN(val[0])) ? 0 : ((val[0] > 255) ? 255 : val[0]);
  val[1] = (val[1] < 0 || isNaN(val[1])) ? 0 : ((val[1] > 255) ? 255 : val[1]);
  val[2] = (val[2] < 0 || isNaN(val[2])) ? 0 : ((val[2] > 255) ? 255 : val[2]);

  return val;
}