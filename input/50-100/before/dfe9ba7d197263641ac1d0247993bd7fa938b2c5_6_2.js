function () {

        expect(moduleFake.getNumber()).to.be(0);

        moduleFake.__set__("myNumber", 2);

        expect(moduleFake.getNumber()).to.be(2);

    }