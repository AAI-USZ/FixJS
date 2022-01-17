function( client ) {
            this.client = client;
            // Commands.
            this.client.bind('cmd.set.wsc', this.setter.bind(extension) );
            this.client.bind('cmd.connect.wsc', this.connect.bind(extension) );
            this.client.bind('cmd.join.wsc', this.join.bind(extension) );
            this.client.bind('cmd.part.wsc', this.part.bind(extension) );
            this.client.bind('cmd.title.wsc', this.title.bind(extension) );
            this.client.bind('cmd.promote.wsc', this.promote.bind(extension) );
            this.client.bind('cmd.me.wsc', this.action.bind(extension) );
            this.client.bind('cmd.kick.wsc', this.kick.bind(extension) );
            this.client.bind('cmd.raw.wsc', this.raw.bind(extension) );
            this.client.bind('cmd.say.wsc', this.say.bind(extension) );
            this.client.bind('cmd.npmsg.wsc', this.npmsg.bind(extension) );
            this.client.bind('cmd.clear.wsc', this.clear.bind(extension) );
            // userlistings
            this.client.bind('set.userlist.wsc', this.setUsers.bind(extension) );
        }