function(id)
  {
    this.showOverlay();
    new Effect.Appear('RB_window', {duration: 0.4, queue: 'end'});        
    this.cloneWindowContents(id);
  }