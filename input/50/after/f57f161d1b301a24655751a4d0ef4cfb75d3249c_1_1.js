function() {
  assert.equal(connectErr.code, 'ER_HOST_NOT_PRIVILEGED');
  assert.ok(/You suck/.test(connectErr.message));
  assert.equal(connectErr.fatal, true);
}