function repeat(fn, count, args) {
    while (0 < count--)
        fn.apply(this, args);
}