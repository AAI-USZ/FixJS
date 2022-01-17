function(){
        group.addCard(1);
        group.addCard(2);
        expect(group.getCards()[0].cardId).toEqual(2);
        expect(group.getCards()[1].cardId).toEqual(1);
    }