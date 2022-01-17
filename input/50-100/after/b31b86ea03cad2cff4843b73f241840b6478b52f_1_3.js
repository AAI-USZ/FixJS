function buildMessage (obj) {
  var str = obj.toString();
  var lenStr = "" + Buffer.byteLength(str).toString(16);
  while (lenStr.length < HEADER_LEN)
    lenStr = "0" + lenStr;
  return lenStr + str;
}