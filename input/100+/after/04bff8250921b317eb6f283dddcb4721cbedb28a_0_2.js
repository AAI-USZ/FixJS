function (m, r, s) {
      if (!hlp.between(r, ZERO, this.q) || !hlp.between(s, ZERO, this.q))
        return false

      var hm = SHA1.SHA1(m)
      hm = BigInt.str2bigInt(hm.toString(SHA1.enc.Hex), 16)

      var w = BigInt.inverseMod(s, this.q)
      var u1 = BigInt.multMod(hm, w, this.q)
      var u2 = BigInt.multMod(r, w, this.q)

      u1 = BigInt.powMod(this.g, u1, this.p)
      u2 = BigInt.powMod(this.y, u2, this.p)

      var v = BigInt.mod(BigInt.multMod(u1, u2, this.p), this.q)

      return BigInt.equals(v, r)
    }