function(){
        group.addCard(2);
        group.addCard(1);
        group.addCard(3,2);
        expect(group.getCards()[0].cardId).toEqual(2);
        expect(group.getCards()[1].cardId).toEqual(3);
        expect(group.getCards()[2].cardId).toEqual(1);
    }