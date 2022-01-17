function () {
    charm.display('bright').background(ix++).write(' '+ ix.toString() + ' ');
    if (ix === 256) {
        clearInterval(iv);
        charm.write('\n');
        exit();
    }
}