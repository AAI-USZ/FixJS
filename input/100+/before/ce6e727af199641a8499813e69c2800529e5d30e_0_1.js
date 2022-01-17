function() {
        var group0 = CardGame.Group("group_0", 10, 10, {});
        spyOn(CardGame, "Group").andReturn(group0);
        spyOn(group0, "addCard").andCallThrough();
        var game = CardGame.Game(transport);
        transport.trigger("InitialState", [{ cards: [1, 2, 3], group_id: "group_0", style: "stack", x: 10, y: 10 }]);
        game.startMoving({cardId:2});
        game.receiveCard(2, "group_0");
        expect(group0.addCard).toHaveBeenCalledWith(2);
    }