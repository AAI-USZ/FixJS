function verInfoValue(pblock, bstr){
  var verStr = ctypes.jschar.array()(bstr);
  var blen = ctypes.unsigned_int();
  var pbuf = new ctypes.voidptr_t();
  var res = VerQueryValueW(pblock, verStr, pbuf.address(), blen.address());
  if (!res || blen.value == 0) return null;
  if (bstr.match(/^\\StringFileInfo/)) 
    return ctypes.cast(pbuf, ctypes.jschar.ptr).readString();
  else return pbuf;
}