function () {
        var person1 = Object.create(Application.Person);
        var person2 = Object.create(Application.Person, { name: { value: "Bob"} });
        equal(person1.sayName(), "James");
        equal(person2.sayName(), "Bob");

    }