function () {

            this.animations.stand = this.getAnimationGroup('stand')||null;

            this.animations.run = this.getAnimationGroup('run')||null;

            this.animations.hurted = this.getAnimationGroup('hurted')||null;

            var attack = this.getAnimationGroup('attack');

            Object.defineProperty(this.animations,"attack",{get:function(){

                if(this.magicAttack)

                    return this.animations[this.magicAttack];

                else return attack;

            }})



            this.animations.magic = this.getAnimationGroup('magic')||null;

            this.animations.dead = this.getAnimationGroup('dead')|null;

        }