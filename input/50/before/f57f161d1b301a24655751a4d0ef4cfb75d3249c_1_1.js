function() {
  assert.equal(connectErr.code, 'ER_HOST_NOT_PRIVILEGED');
  assert.equal(connectErr.fatal, true);
}