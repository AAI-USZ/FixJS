function () {
            var Person,
            p;

            Person = new Model();
            Person.hasA("firstName");
            Person.hasA("lastName");
            Person.hasAn("id");

            Person.isBuiltWith("firstName", "lastName", "%id");

            //Person = Person.create();
            
            expect(function () {
                p = new Person("semmy");
            }).toThrow(new Error("Constructor requires firstName, lastName to be specified"));

            expect(function () {
                p = new Person("semmy","purewal");
            }).not.toThrow(new Error("Constructor requires firstName, lastName to be specified"));

            expect(function () {
                p = new Person("semmy","purewal", 100);
            }).not.toThrow(new Error("Constructor requires firstName, lastName to be specified"));
        }