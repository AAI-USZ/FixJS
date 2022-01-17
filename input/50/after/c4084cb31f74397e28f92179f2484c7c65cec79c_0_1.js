function abort(msg) {
  exit(1, !msg? null : msg.split('. ').join('.\r\n'));
}