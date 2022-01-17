f        var session = new EditSession([
            '[ ',
            'stuff',
            ']',
            '[ ',
            '{ ',
            '[  #-',
        ]);

        var mode = new PythonMode();
        session.setFoldStyle("markbeginend");
        session.setMode(mode);

        assert.equal(session.getFoldWidget(0), "");
        assert.equal(session.getFoldWidget(1), "");
        assert.equal(session.getFoldWidget(2), "");
        assert.equal(session.getFoldWidget(3), "start");
        assert.equal(session.getFoldWidget(4), "start");
        assert.equal(session.getFoldWidget(5), "");

        assert.range(session.getFoldWidgetRange(0), 0, 1, 2, 0);
        assert.equal(session.getFoldWidgetRange(3), null);
        assert.equal(session.getFoldWidgetRange(5), null);
    },
