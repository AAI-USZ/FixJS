function()
  {
    return this.required_services.every(_is_enabled);
  }