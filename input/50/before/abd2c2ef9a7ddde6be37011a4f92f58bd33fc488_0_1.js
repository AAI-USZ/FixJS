function(next) {
        if (next < 40) {
            jim.spell();
            battle.heal(jim, 100);
        }
    }