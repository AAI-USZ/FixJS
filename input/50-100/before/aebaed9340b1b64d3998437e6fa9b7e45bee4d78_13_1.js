function(container)
  {
    // optimization - having no line wrapping allows to optimize out width-only changes
    if(this.isvisible() && context['container-height'] != parseInt(container.style.height))
    {
      __view_is_destroyed = true;
      this.createView(container);
      messages.post('view-created', {id: this.id, container: container});
    }
  }