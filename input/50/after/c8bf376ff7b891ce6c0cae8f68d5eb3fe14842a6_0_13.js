function () {
        var person = Object.create(Application.Person);
        equal(person.sayName(), "James");
    }