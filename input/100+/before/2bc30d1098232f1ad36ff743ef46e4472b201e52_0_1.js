function(N, L) {
    var n = Math.floor(L / N)
    var b = (L % N) - 1

    var g = N
    var seed = BigInt.randBigInt(N)

    var u = (SHA1.SHA1(hlp.bigInt2bits(seed))).toString(SHA1.enc.Hex)
    var tmp = BigInt.mod(BigInt.add(seed, ONE), hlp.twotothe(g))
    tmp = (SHA1.SHA1(hlp.bigInt2bits(tmp))).toString(SHA1.enc.Hex)
    u = hlp.bigBitWise(
        'XOR'
      , BigInt.str2bigInt(tmp, 16)
      , BigInt.str2bigInt(u, 16)
    )

    this.q = hlp.bigBitWise('OR', u, hlp.twotothe(159))
    this.q = hlp.bigBitWise('OR', this.q, ONE)
  }