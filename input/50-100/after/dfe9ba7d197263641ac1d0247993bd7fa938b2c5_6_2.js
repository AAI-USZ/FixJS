function () {

        expect(moduleFake.getNumber() === 0).to.be(true);

        moduleFake.__set__("myNumber", 2);

        expect(moduleFake.getNumber() === 2).to.be(true);

    }