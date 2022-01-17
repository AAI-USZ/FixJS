function () {
  it('throws an error explaining how to correct the problem', function () {
    (function () { proxyquire.setup(); }).should.throw(/top level/i);
  })
}