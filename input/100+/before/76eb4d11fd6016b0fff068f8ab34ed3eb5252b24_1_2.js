function () {
    it('should return xcards from rsid', function () {
      expect(H.xcards_from_rsid('B')).toEqual([]);
      expect(H.xcards_from_rsid('BAB')).toEqual([
        $.extend({dropped: false}, H.card_from_cid(0x01))
      ]);
      expect(H.xcards_from_rsid('BADgc')).toEqual([
        $.extend({dropped: false}, H.card_from_cid(0x03)),
        $.extend({dropped: true}, H.card_from_cid(0x1c)),
      ]);
    });
    it('should reject if rsid contains an invalid character', function () {
      expect(function () {H.xcards_from_rsid('B??');}).toThrow();
    });
    it('should reject if rsid contains trailing data', function () {
      expect(function () {H.xcards_from_rsid('BA');}).toThrow();
    });
    it('should reject if rsid contains an invalid cid', function () {
      expect(function () {H.xcards_from_rsid('BAA');}).toThrow();
    });
  }