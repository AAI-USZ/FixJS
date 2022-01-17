function(S,nuls){
  function l(x, n) { // rotate left
    return (x<<n) | (x>>>(32-n))
  }
  function r(x, n) { // rotate right
    return (x>>>n) | (x<<(32-n))
  }
  function i2s(i) { // int2str
    return ("0000000"+(i>>>0).toString(16)).slice(-8)
  }
  function s2i(s) { // str2int array
    return s.split("").map(function(i){return i.charCodeAt()})
  }

  var sha_init = function(data) {
    if (typeof(data) == "string") data = s2i(unescape( encodeURIComponent( data ) ));

      var bin = [], i = 0, len = data.length;
      while (i < len) bin[i >> 2] = data[i++]<<24|data[i++]<<16|data[i++]<<8|data[i++];

        i = len << 3;
        bin[len >> 2] |= 0x80 << (24 - (i & 31));
        return bin.concat(nuls.slice( bin.length & 15 ), [0, i]);
  }
  , sha_format = function(asBytes, a) {
    if (asBytes) {
      // convert to byte array
      for (var out = [], i=0, len=a.length;i<len;i++) out.push( (a[i]>>>24)&0xff, (a[i]>>>16)&0xff, (a[i]>>>8)&0xff, a[i]&0xff );
        return out;
    }
    return a.map(i2s).join("");
  }

  function sha1(data, asBytes) {
    var A = 0x67452301
    , B = 0xefcdab89
    , C = 0x98badcfe
    , D = 0x10325476
    , E = 0xc3d2e1f0
    , bin = sha_init(data)
    , i = 0, j, len = bin.length, a, b, c, d, e, t, w = []

    while (i < len) {
      w = bin.slice(i, i+=(j=16))
      while (j < 80) w[j++] = l(w[j-4]^w[j-9]^w[j-15]^w[j-17],1)
        a = A
      b = B
      c = C
      d = D
      e = E
      j = 0
      while (j<80) {
        if (j<20) t=((b&c)|(~b&d))+0x5A827999
          else if (j<40) t=(b^c^d)+0x6ED9EBA1
            else if (j<60) t=((b&c)|(b&d)|(c&d))+0x8F1BBCDC
              else t=(b^c^d)+0xCA62C1D6
                t += l(a,5)+e+w[j++]
        e = d
        d = c
        c = l(b,30)
        b = a
        a = t>>>0
      }
      A = (a + A)>>>0
      B = (b + B)>>>0
      C = (c + C)>>>0
      D = (d + D)>>>0
      E = (e + E)>>>0
    }
    return sha_format(asBytes, [A, B, C, D, E]);
  }



  S.sha1 = function(asBytes){
    return sha1(""+this, asBytes);
  }

  function sha256(data, asBytes) {
    var A = 0x6a09e667
    , B = 0xbb67ae85
    , C = 0x3c6ef372
    , D = 0xa54ff53a
    , E = 0x510e527f
    , F = 0x9b05688c
    , G = 0x1f83d9ab
    , H = 0x5be0cd19
    , bin = sha_init(data)
    , i = 0, j, len = bin.length, a, b, c, d, e, f, g, h, t1, t2, w = []
    , map = [ 
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5
      , 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174
      , 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da
      , 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967
      , 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85
      , 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070
      , 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3
      , 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ]

    while (i < len) {
      w = bin.slice(i, i+=(j=16))
      while (j < 64) {
        t1 = w[j-2]
        t2 = w[j-15]
        t1 = (r(t1, 17)^r(t1,19)^(t1>>>10)) + w[j-7] + (r(t2,7)^r(t2,18)^(t2>>>3)) + w[j-16]
        w[j++] = t1
      }
      a = A
      b = B
      c = C
      d = D
      e = E
      f = F
      g = G
      h = H
      j = 0
      while (j < 64) {
        t1 = h + (r(e,6)^r(e,11)^r(e,25)) + ((e&f)^((~e)&g)) + map[j] + w[j++]
        t2 = (r(a,2)^r(a,13)^r(a,22)) + ((a&b)^(a&c)^(b&c))
        h = g
        g = f
        f = e
        e = (d + t1)>>>0
        d = c
        c = b
        b = a
        a = (t1 + t2)>>>0
      }
      A = (a + A)>>>0
      B = (b + B)>>>0
      C = (c + C)>>>0
      D = (d + D)>>>0
      E = (e + E)>>>0
      F = (f + F)>>>0
      G = (g + G)>>>0
      H = (h + H)>>>0
    }
    return sha_format(asBytes, [A, B, C, D, E, F, G, H]);
  }

  S.sha256 = function(asBytes){
    return sha256(""+this, asBytes);
  }

  //** HMAC 
  function hmac(hasher, blocksize, key, txt) {
    var i = 0, ipad = [], opad = [];
    key = (key.length > blocksize) ? hasher(key, true) : s2i(key);
    for(; i<blocksize; ipad[i]=key[i]^0x36, opad[i]=key[i++]^0x5c);
      return hasher(opad.concat(hasher(ipad.concat(s2i(txt)),true)));
  }

  S.hmac_sha1 = function(key){
    return hmac(sha1, 64, key, this);
  }

  S.hmac_sha256 = function(key){
    return hmac(sha256, 64, key, this);
  }

  //*/


  /** PBKDF2

  ** PBKDF2 Implementation (described in RFC 2898)
  *
  *  @param string p password
  *  @param string s salt
  *  @param int c iteration count (use 1000 or higher)
  *  @param int kl derived key length
  *  @param string a hash algorithm
  *
  *  @return string derived key

  function pbkdf2( $p, $s, $c, $kl, $a = 'sha256' ) {

  $hl = strlen(hash($a, null, true)); # Hash length
  $kb = ceil($kl / $hl);              # Key blocks to compute
  $dk = '';                           # Derived key

  # Create key
  for ( $block = 1; $block <= $kb; $block ++ ) {

  # Initial hash for this block
  $ib = $b = hash_hmac($a, $s . pack('N', $block), $p, true);

  # Perform block iterations
  for ( $i = 1; $i < $c; $i ++ )

  # XOR each iterate
  $ib ^= ($b = hash_hmac($a, $b, $p, true));

  $dk .= $ib; # Append iterated block
  }

  # Return derived key of correct length
  return substr($dk, 0, $kl);
  }

  //*/
}