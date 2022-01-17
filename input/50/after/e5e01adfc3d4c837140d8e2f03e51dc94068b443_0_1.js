function (err) {
  if (!(err instanceof Error)) err = new Error(err);
  return this.emit('err', err);
}