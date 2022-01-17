function () {
    it('should return rsid from xcards', function () {
      expect(H.rsid_from_xcards([])).toEqual('B');
      expect(H.rsid_from_xcards([
        $.extend({dropped: false}, H.card_from_cid(0x01))
      ])).toEqual('BAB');
      expect(H.rsid_from_xcards([
        $.extend({dropped: false}, H.card_from_cid(0x03)),
        $.extend({dropped: true}, H.card_from_cid(0x1c))
      ])).toEqual('BADgc');
    });
    it('should return rsid as if given xcards are sorted', function () {
      expect(
        H.rsid_from_xcards([
          $.extend({dropped: false}, H.card_from_cid(0x01)),
          $.extend({dropped: true}, H.card_from_cid(0x02)),
          $.extend({dropped: false}, H.card_from_cid(0x04)),
          $.extend({dropped: true}, H.card_from_cid(0x08)),
          $.extend({dropped: false}, H.card_from_cid(0x10))
        ])
      ).toEqual(
        H.rsid_from_xcards([
          $.extend({dropped: false}, H.card_from_cid(0x10)),
          $.extend({dropped: false}, H.card_from_cid(0x04)),
          $.extend({dropped: true}, H.card_from_cid(0x02)),
          $.extend({dropped: false}, H.card_from_cid(0x01)),
          $.extend({dropped: true}, H.card_from_cid(0x08))
        ])
      );
    });
  }