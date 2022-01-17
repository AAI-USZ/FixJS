function() {
      var bits_1 = this.getUintField(2);
      
      //Sign.
      var s = ((bits_1>>15) === 0) ? 1 : -1;
      
      //Exponent. Make it unsigned.
      var e = ((bits_1>>4) & 0x7ff);
      e = e >>> 0;
      
      //3 bits of m here.
      var m = bits_1 & 0xf;
      
      if (e !== 0)
        m = (bits_1 & 0xf) | 0x10;
        
      //We CANNOT use any more bit operations on the mantissa,
      //since bit ops operate on 32 bits ONLY.
      
      //"Shift" it over by 4 bytes.
      m *= Math.pow(2,32);
      //"Or" it with the next 4 bytes.
      m += this.getUintField(4);
      //"Shift" it 2 more bytes.
      m *= Math.pow(2,16);
      //"Or" it with the final 2 bytes.
      m += this.getUintField(2);
      
      //Left shift 1 if e is 0.
      if (e === 0)
        m *= 2;

      var value = s * m * Math.pow(2, e - 1075);
      return value;
    }