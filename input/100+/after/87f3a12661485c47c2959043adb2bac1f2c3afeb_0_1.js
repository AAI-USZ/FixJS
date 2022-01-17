function () {
        self.button = false;
        self.textinput = false;

        if (self.$target.filter ('a').length ||
            self.$target.filter ('input[type=submit]').length ||
            self.$target.filter ('input[type=button]').length ||
            self.$target.filter ('img').length)
        {
            self.button = true;
        }
        else if (self.$target.filter ('input[type=text]').length ||
                 self.$target.filter ('textarea').length ||
                 self.$target.filter ('select').length)
        {
            self.textinput = true;
        }

        if (self.button)
        {
            /* show content when a button is pressed. */
            self.$target.bind ('click.mb', function (event) {
                self.toggle ();
                event.preventDefault ();
            });
        }

        if (self.textinput)
        {
            /* show content when an input field is focused. */
            self.$target.bind ('focus.mb', function (event) {

                self.show ();
            });
        }

        return self;
    }