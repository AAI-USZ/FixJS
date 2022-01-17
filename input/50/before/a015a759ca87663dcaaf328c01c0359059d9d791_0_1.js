function setRaw (mode) {
    (process.stdin.setRawMode || tty.setRawMode)(mode);
}