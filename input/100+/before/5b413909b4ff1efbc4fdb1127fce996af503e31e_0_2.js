function (msg, from) {
            woh.log('enter stage [battle] with msg ' + msg);
            woh.show(woh.els.battle);

            woh.log('enter stage [Battle] with msg ' + msg);
            woh.show(woh.els.canvasWrap);
            // temp part to do area
            var me = this;
            /*
            document.querySelector("body").onmouseup = function (e) {
                if (e.target.tagName != "CANVAS") return;
                var rect = e.target.getClientRects()[0];
                var offsetX = e.clientX - rect.left;
                var offsetY = e.clientY - rect.top;
                me.hurtArea({
                    left: offsetX - 50,
                    top: offsetY - 50,
                    right: offsetX + 50,
                    bottom: offsetY + 50
                }, e.target);
            }*/
            // rio_tang
            this.aiController = {
                knowPos: function (obj, x, y) {
                    if(obj == me.roles.get('rio_tang')) {
                        var crab = me.roles.get('crab');
                        if(!crab) return;
                        var crabpos = crab.getPos();
                        if(crabpos.x-x>0)
                            crab.moveTo(x+100,y+50);
                        else if(crabpos.x-x<0)
                            crab.moveTo(x-100,y+50);
                    }

                    var rio = me.roles.get('rio_tang');
                    var crab = me.roles.get('crab');
                    var crabpos = crab.getPos();
                    var riopos = rio.getPos();
                    if(riopos.x-crab.x<120 && riopos.x-crab.x>0 && Math.abs(riopos.y-crab.y)<60) {
                        crab.faceRight();
                        crab.normalAttack();
                    }
                   if(riopos.x-crab.x>-120 && riopos.x-crab.x<0 && Math.abs(riopos.y-crab.y)<60) {
                        crab.faceLeft();
                        crab.normalAttack();
                    }
                },
                knowSprite: function (obj) {
                    
                },
            }
            this.roles.add('rio_tang', new woh.Role(woh.runtime.role[1], this.aiController));
            this.roles.get('rio_tang').setPos(100, 400);
            this.roles.get('rio_tang').stage = this;
            // this.roles.add('shaofei_cheng', new woh.Role(woh.runtime.role[1], this.aiController));
            // this.roles.get('shaofei_cheng').setPos(200, 400);
            // this.roles.get('shaofei_cheng').stage = this;
            this.roles.add('crab', new woh.Monster(woh.g_config.monsters.crab, this.aiController));
            this.roles.get('crab').setPos(500, 400);
            this.roles.get('crab').stage = this;
        }