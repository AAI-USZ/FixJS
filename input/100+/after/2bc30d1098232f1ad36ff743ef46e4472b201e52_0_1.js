function(N, L) {
    var n = Math.floor(L / N)
    var b = (L % N) - 1

    var g = N
    var seed = BigInt.randBigInt(N)

    var u = (SHA1.SHA1(hlp.bigInt2bits(seed))).toString(SHA1.enc.Hex)
    var twotog = hlp.twotothe(g)
    var tmp = BigInt.mod(BigInt.add(seed, ONE), twotog)
    tmp = (SHA1.SHA1(hlp.bigInt2bits(tmp))).toString(SHA1.enc.Hex)
    u = hlp.bigBitWise(
        'XOR'
      , BigInt.str2bigInt(tmp, 16)
      , BigInt.str2bigInt(u, 16)
    )

    this.q = hlp.bigBitWise('OR', u, hlp.twotothe(g - 1))
    this.q = hlp.bigBitWise('OR', this.q, ONE)

    // test if q is prime!
    // if not, rinse and repeat

    var counter = 0
    var offset = TWO

    var V = new Array(n)

    var cache_seed_plus_offset = BigInt.add(seed, offset)

    var i = 0
    for (; i < n; i++) {
      V[i] = BigInt.add(
          cache_seed_plus_offset
        , BigInt.str2bigInt(i.toString(), 10)
      )
      V[i] = SHA1.SHA1(hlp.bigInt2bits(BigInt.mod(V[i], twotog)))
    }

    // console.log(V)

  }