function () {
        var person1 = Object.create(Midway.Person);
        var person2 = Object.create(Midway.Person, { name: { value: "Bob"} });
        equal(person1.sayName(), "James");
        equal(person2.sayName(), "Bob");

    }