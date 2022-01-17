function buildMessage (obj) {
  var str = obj.toString();
  var lenStr = "" + str.length.toString(16);
  while (lenStr.length < HEADER_LEN)
    lenStr = "0" + lenStr;
  return lenStr + str;
}