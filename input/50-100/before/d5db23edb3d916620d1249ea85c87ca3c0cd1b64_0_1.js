function(test) {
        test.expect(12);
        moment.lang('pt-br');
        var expected = 'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    }