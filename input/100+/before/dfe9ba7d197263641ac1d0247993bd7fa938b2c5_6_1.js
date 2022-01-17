function () {

        var newObj = { hello: "hello" };



        expect(moduleFake.getNumber()).to.be(0);

        expect(moduleFake.getObj()).to.eql({});

        moduleFake.__set__({

            myNumber: 2,

            myObj: newObj

        });

        expect(moduleFake.getNumber()).to.be(2);

        expect(moduleFake.getObj()).to.be(newObj);

    }