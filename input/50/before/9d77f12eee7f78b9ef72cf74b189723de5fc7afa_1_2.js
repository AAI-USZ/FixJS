function(event)
  {
    if (event.data && event.data.content)
    {
      this.responsebody = event.data;
    }
  }