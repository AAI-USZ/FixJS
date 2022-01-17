function (view, animations) {
    function step() {
        if (animations.length == 0) {
            view = animations = null;
            return;
        }
        var animation = animations.shift();
        animation.addEventListener('complete', step);
        view.animate(animation);
    }

    step();
}