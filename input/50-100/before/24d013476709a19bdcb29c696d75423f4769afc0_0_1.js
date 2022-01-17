function(local_path) {

    var fd;
    if ((fd = socket(AF_UNIX, SOCK_STREAM, 0)) === -1)
        throw errnoException(errno, 'socket');

    var s = new Socket(fd);
    if (local_path) {
        if (bind(fd, local_path) == -1) {
            s.emit('error', errnoException(errno, 'bind'));
        }

        s.local_path = local_path;
    }

    return s;
}