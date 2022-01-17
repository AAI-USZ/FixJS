function () {
    charm.background(ix++).write(' ');
    if (ix === 256) {
        clearInterval(iv);
        charm.write('\n');
        exit();
    }
}