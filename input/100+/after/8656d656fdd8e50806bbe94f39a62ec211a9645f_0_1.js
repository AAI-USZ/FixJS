function() {
            // bindings
            ig.input.unbindAll();
            upBindings(); actionBindings(); leftBindings(); rightBindings();

            if (ig.ua.mobile) { activateMobile(); }

            ig.game.skeleton = {};
            ig.game.skeleton.next_level = 0;

            if (!SkeletonJigsaw.getCurrentLevel()) {
                SkeletonJigsaw.setCurrentLevel("Level01");
            }

            this.prepareLevel();
            this.loadLevel(ig.global[SkeletonJigsaw.getCurrentLevel()]);

            this.gameover = new ig.Timer();
        }