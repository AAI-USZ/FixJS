function (hm) {
      var k = makeRandom(ZERO, this.q)
      var r = BigInt.mod(BigInt.powMod(this.g, k, this.p), this.q)
      if (BigInt.isZero(r)) return this.hsign(hm)
      var s = BigInt.inverseMod(k, this.q)
      s = BigInt.multMod(s, BigInt.add(hm, BigInt.mult(this.x, r)), this.q)
      if (BigInt.isZero(s)) return this.hsign(hm)
      return [r, s]
    }