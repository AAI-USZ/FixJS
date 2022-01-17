function(test) {
        test.expect(7);
        moment.lang('it');
        var expected = 'Domenica Dom D_Lunedì Lun L_Martedì Mar Ma_Mercoledì Mer Me_Giovedì Gio G_Venerdì Ven V_Sabato Sab S'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    }