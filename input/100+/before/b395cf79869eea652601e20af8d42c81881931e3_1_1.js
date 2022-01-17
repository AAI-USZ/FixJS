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
            this.aiController = new woh.AIController(this);
            this.roles.add('rio_tang', new woh.Role(woh.runtime.role['001'], this.aiController));
            this.roles.get('rio_tang').setPos(100, 400);
            this.roles.get('rio_tang').stage = this;
            this.roles.add('sola_cheng', new woh.Role(woh.runtime.role['002'], this.aiController));
            this.roles.get('sola_cheng').setPos(200, 400);
            this.roles.get('sola_cheng').stage = this;
            this.roles.add('crab', new woh.Monster(woh.g_config.monsters.crab, this.aiController));
            this.roles.get('crab').setPos(500, 400);
            this.roles.get('crab').stage = this;
            this.roles.add('attack_1', new woh.SkillEffect(woh.g_config.skill_effect.normal_1, this.aiController));
            this.roles.get('attack_1').setPos(300, 300);
            this.roles.get('attack_1').stage = this;
            
        }