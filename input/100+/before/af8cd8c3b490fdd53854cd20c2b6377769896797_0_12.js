function( client ) {
            this.client = client;
            // Commands.
            this.client.bind('cmd.set.wsc', this.setter);
            this.client.bind('cmd.connect.wsc', this.connect);
            this.client.bind('cmd.join.wsc', this.join);
            this.client.bind('cmd.part.wsc', this.part);
            this.client.bind('cmd.title.wsc', this.title);
            this.client.bind('cmd.promote.wsc', this.promote);
            this.client.bind('cmd.me.wsc', this.action);
            this.client.bind('cmd.kick.wsc', this.kick);
            this.client.bind('cmd.raw.wsc', this.raw);
            this.client.bind('cmd.say.wsc', this.say);
            this.client.bind('cmd.npmsg.wsc', this.npmsg);
            this.client.bind('cmd.clear.wsc', this.clear);
            // userlistings
            this.client.bind('set.userlist.wsc', this.setUsers);
        }