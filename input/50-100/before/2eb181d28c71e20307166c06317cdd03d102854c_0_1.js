function () {
  process.kill(child.pid);
  assert.throws(process.kill(child.pid), Error);
}