function () {
            if (ig.input.pressed('action')) {
                if (this.currentAnim == this.anims.unlocked){
                    this.currentAnim = this.anims.opened;
                } else if (this.currentAnim == this.anims.opened){
                    var level = 'Level0' + this.moveTo;

                    SkeletonJigsaw.setCurrentLevel(level);
                    ig.game.skeleton.next_level = ig.global[level];
                }
            }
        }