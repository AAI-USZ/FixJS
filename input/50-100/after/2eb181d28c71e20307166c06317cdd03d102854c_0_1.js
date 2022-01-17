function () {
  assert(persistentPid !== -1);
  assert.throws(function () {
    process.kill(child.pid);
  });
  assert.doesNotThrow(function () {
    process.kill(persistentPid);
  });
}