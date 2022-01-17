function(){
        var group0 = CardGame.Group("group_0", 10, 10, {});
        spyOn(CardGame, "Group").andReturn(group0);
        var game = CardGame.Game(transport);
        transport.trigger("InitialState", [{ cards: [1, 2, 3], group_id: "group_0", style: "stack", x: 10, y: 10 }]);
        game.startMoving({cardId:3});
        group0.addCard = jasmine.createSpy();
        game.cardReceivedCard({cardId:3, moveStartGroupId:"group_0"}, 1);
        expect(group0.addCard).toHaveBeenCalledWith(3, 1);
    }