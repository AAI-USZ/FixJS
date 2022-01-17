function() {
  var ref = priv.get( this );

  clearInterval( this.interval );

  priv.set( this, {
    isOn: ref.isOn,
    isRunning: false,
    value: ref.value
  });

  return this;
}