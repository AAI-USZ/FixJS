function(command, o, index) {
        this.index = index;
        this.o = o;

        this.actor = new St.BoxLayout({ vertical: true });

        let cmdTxt = new St.Label({ text: command });
        cmdTxt.clutter_text.ellipsize = Pango.EllipsizeMode.END;
        this.actor.add(cmdTxt);
        let box = new St.BoxLayout({});
        this.actor.add(box);
        let resultTxt = new St.Label({ text: 'r(' + index + ') = ' });
        resultTxt.clutter_text.ellipsize = Pango.EllipsizeMode.END;
        box.add(resultTxt);
        let objLink = new ObjLink(o);
        box.add(objLink.actor);
        let line = new Clutter.Rectangle({ name: 'Separator' });
        let padBin = new St.Bin({ name: 'Separator', x_fill: true, y_fill: true });
        padBin.add_actor(line);
        this.actor.add(padBin);
    }