function () {

        var newObj = { hello: "hello" };



        expect(moduleFake.getNumber() === 0).to.be(true);

        expect(moduleFake.getObj()).to.eql({});

        moduleFake.__set__({

            myNumber: 2,

            myObj: newObj

        });

        expect(moduleFake.getNumber() === 2).to.be(true);

        expect(moduleFake.getObj() === newObj).to.be(true);

    }