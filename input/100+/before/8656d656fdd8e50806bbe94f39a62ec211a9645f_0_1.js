function() {
            // bindings
            ig.input.unbindAll();
            upBindings();
            actionBindings();
            leftBindings();
            rightBindings();

            if (ig.ua.mobile) { activateMobile(); }

            ig.game.skeleton = {};
            ig.game.skeleton.next_level = 0;

            if (!SkeletonJigsaw.getCurrentLevel()) {
                SkeletonJigsaw.setCurrentLevel("Level01");
            }

            ig.global[SkeletonJigsaw.getCurrentLevel()].entities.push({type: "EntityVignette", x:0, y:0})
            ig.global[SkeletonJigsaw.getCurrentLevel()].entities.push({type: "EntityHud", x:0, y:0})

            this.loadLevel(ig.global[SkeletonJigsaw.getCurrentLevel()]);

            ig.global[SkeletonJigsaw.getCurrentLevel()].entities.pop();
            ig.global[SkeletonJigsaw.getCurrentLevel()].entities.pop();

            this.gameover = new ig.Timer();
        }