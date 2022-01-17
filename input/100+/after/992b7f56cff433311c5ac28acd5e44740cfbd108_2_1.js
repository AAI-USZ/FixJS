function () {
        var orders = [
            { id: 1, description: "awesome" },
            { id: 2, description: "awesomer" },
            { id: 2, description: "more awesomer" },
            { id: 3, description: "awesomist" }
        ];
        it("can use the REGEX operator", function () {
            var fe = new FilterExpression("description", "REGEX", "^awesom*"),
                result = select.from(orders).where(fe);

            expect(result.length).toBe(3);
        });

        it("can use the 8 operator", function () {
            var fe = new FilterExpression("description", 8, "^awesom*"),
                result = select.from(orders).where(fe);

            expect(result.length).toBe(3);
        });

        it("it can invert the operator", function () {
            var fe = new FilterExpression("description", "REGEX", "^awesom*", true),
                result = select.from(orders).where(fe);

            expect(result.length).toBe(1);
        });

        it("can handle a search where the field doesn't exist", function () {
            var fe = new FilterExpression("bloodType", "REGEX", "^B*"),
                result = select.from(orders).where(fe);

            expect(result.length).toBe(0);
        });
    }