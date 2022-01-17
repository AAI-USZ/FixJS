function (c, key) {
  console.log(0, c, key)
  if (key.ctrl && key.name == 'c') {
    process.stdin.pause()
  }
}