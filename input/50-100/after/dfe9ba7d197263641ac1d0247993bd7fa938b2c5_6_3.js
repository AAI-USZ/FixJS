function () {

        var newObj = { hello: "hello" };



        expect(moduleFake.getObj()).to.eql({});

        moduleFake.__set__("myObj", newObj);

        expect(moduleFake.getObj() === newObj).to.be(true);

    }