function(w, S){
  if (!("atob" in w)) {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
    , m = {"=":0}
    , i = 64;

    while(m[a[--i]]=i);

    // base64_encode

    w.btoa = function(s){
      for (var out=[],b,i=0,len=s.length;i<len;) {
        b = s.charCodeAt(i++)<<16 | s.charCodeAt(i++)<<8 | s.charCodeAt(i++);
        out.push(a[b>>18&0x3f], a[b>>12&0x3f], a[b>>6&0x3f], a[b&0x3f]);
      }
      if (len%=3) out.splice(len-3, 2, len==1?"==":"=");
        //if (len%=3) { out.length-=3-len; out.push(len==1?"==":"="); }
        //if (len%=3) out[out.length-=3-len]=len==1?"==":"=";
        return out.join("");
    }

    // base64_decode

    w.atob = function(s){
      for (var out=[],b,i=0,len=s.length,s=s.split("");i<len;) {
        b = m[s[i++]]<<18 | m[s[i++]]<<12 | m[s[i++]]<<6 | m[s[i++]];
        out.push(b>>16 & 0xff, b>>8 & 0xff, b & 0xff);
      }
      if (s[len-1] == "=") out.length -= s[len-2] == "=" ? 2 : 1;
        return String.fromCharCode.apply(null, out);
    }
  }

  S.base64_encode = function(){return w.btoa(this)}
  S.base64_decode = function(){return w.atob(this)}
}