function () {
        var person = Object.create(Midway.Person);
        equal(person.sayName(), "James");
    }