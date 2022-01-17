function(t) {
    var v = new Vector();

    v.once("animation:start", function() {
        t.equal(v.x, 10);
    });

    v.once("animation:end", function() {
        t.equal(v.x, 100);
        t.end();
    });

    //run!
    v.animate({
        property: "x",
        transition: $.Animate.Transitions.linear,
        time: 5000,
        fps: 1,
        queue: true
    }, [10, 100]);
}