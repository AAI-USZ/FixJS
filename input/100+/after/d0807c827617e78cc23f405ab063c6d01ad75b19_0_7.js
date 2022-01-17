function () {
            let inspector = new Inspector(this);
            inspector.connect('target', Lang.bind(this, function(i, target, stageX, stageY) {
                this._pushResult('<inspect x:' + stageX + ' y:' + stageY + '>',
                                 target);
            }));
            inspector.connect('closed', Lang.bind(this, function() {
                this.actor.show();
                global.stage.set_key_focus(this._entry);
            }));
            this.actor.hide();
            return true;
        }