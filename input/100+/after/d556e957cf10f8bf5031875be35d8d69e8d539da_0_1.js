function() {
  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  CodeMirror.defineMIME("text/x-d", {
    name: "clike",
    keywords: words("abstract alias align assert auto body bool break byte case cast catch cdouble cent cfloat" +
                    " char class const continue creal dchar debug default delegate delete deprecated double dstring" +
                    " enum export extern false final float function goto idouble" +
                    " if ifloat immutable import in inout int interface invariant ireal is lazy long macro mixin" + 
                    " module new nothrow out override package pragma private protected public pure real ref" + 
                    " return scope string shared short static struct success super switch synchronized template this throw true" + 
                    " try typeid typeof ubyte ucent uint ulong union unittest ushort version void volatile" + 
                    " wchar with wstring __FILE__ __LINE__ __gshared __thread __traits"),
    atoms: words("asm catch class debug do else exit failure finally for foreach foreach_reverse if struct switch synchronized unittest version try while with "),

    hooks: {
    }
  });
}