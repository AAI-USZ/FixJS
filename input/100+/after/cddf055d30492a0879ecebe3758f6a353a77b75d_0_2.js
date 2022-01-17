function () {
        beforeEach(function () {
            suit.isImmutable().and.validatesWith(function (suit) {
                return suits.indexOf(suit) > -1;
            });
        });

        it("should make a formerly immutable attribute mutable again", function () {
            suit.isMutable();
            suit.addTo(Card);
            Card.suit("clubs");
            expect(Card.suit()).toBe("clubs");
            Card.suit("hearts");
            expect(Card.suit()).toBe("hearts");
            Card.suit("diamonds");
            expect(Card.suit()).toBe("diamonds");
        });

        it("should return the attribute for chaining", function () {
            expect(suit.isMutable()).toBe(suit);
        });
    }