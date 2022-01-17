function isAvailable(net, ignore) {
  var readyState = net.readyState
    , writable = readyState === 'open' || readyState === 'writeOnly'
    , writePending = net._pendingWriteReqs || 0
    , writeQueue = net._writeQueue || []
    , writes = writeQueue.length || writePending;

  // if the stream is writable and we don't have anything pending we are 100%
  // sure that this stream is available for writing
  if (writable && writes === 0) return 100;

  // the connection is already closed or has been destroyed, why on earth are we
  // getting it then, remove it from the pool and return 0
  if (readyState === 'closed' || net.destroyed) {
    this.remove(net);
    return 0;
  }

  // if the stream isn't writable we aren't that sure..
  if (!writable) return 0;

  // the connection is still opening, so we can write to it in the future
  if (readyState === 'opening') return 70;

  // we have some writes, so we are going to substract that amount from our 100
  if (writes < 100) return 100 - writes;

  // we didn't find any relaiable states of the stream, so we are going to
  // assume something random, because we have no clue, so generate a random
  // number between 0 - 70
  return Math.floor(Math.random() * 50);
}