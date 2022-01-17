function () {
        this._super();
        this.alignSpritesLeft(2);


        // Test:
        //   Sequence should work both with IntervalAction and InstantActions
        var move1 = cc.MoveBy.create(3, cc.PointMake(250, 0));
        var move2 = cc.MoveBy.create(3, cc.PointMake(0, 50));
        var tog1 = new cc.ToggleVisibility();
        var tog2 = new cc.ToggleVisibility();
        var seq = cc.Sequence.create(move1, tog1, move2, tog2, move1.reverse());
        var action = cc.Repeat.create(
            cc.Sequence.create(seq, seq.reverse()), 3
        );


        // Test:
        //   Also test that the reverse of Hide is Show, and vice-versa
        this._kathia.runAction(action);

        var move_tamara = cc.MoveBy.create(1, cc.PointMake(100, 0));
        var move_tamara2 = cc.MoveBy.create(1, cc.PointMake(50, 0));
        var hide = new cc.Hide();
        var seq_tamara = cc.Sequence.create(move_tamara, hide, move_tamara2);
        var seq_back = seq_tamara.reverse();
        this._tamara.runAction(cc.Sequence.create(seq_tamara, seq_back));
    }