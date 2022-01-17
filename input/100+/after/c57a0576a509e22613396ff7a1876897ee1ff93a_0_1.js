function(newGridHtml, server_params){
    var self = this;
    if(self.id != server_params.grid_id){
      this.server_params.grid_id = self.id;
      newGridHtml = $(newGridHtml);
      newGridHtml.attr('data-grid-id', self.id).find('[data-grid-id]').each(function(){ $(this).attr('data-grid-id', self.id) });
    }

    $(this.selectors.grid).replaceWith(newGridHtml);
    this.attachAPI();
    this.reinitQtipsAndFboxes();
    this.fire('updatedWithAjax');
    this.server_params = server_params;
  }