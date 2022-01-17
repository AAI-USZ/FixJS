function () {

        var newObj = { hello: "hello" };



        expect(moduleFake.getObj()).to.eql({});

        moduleFake.__set__("myObj", newObj);

        expect(moduleFake.getObj()).to.be(newObj);

    }