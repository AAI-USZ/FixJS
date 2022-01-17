function setRaw (mode) {
    process.stdin.setRawMode ? process.stdin.setRawMode(mode) : tty.setRawMode(mode);
}