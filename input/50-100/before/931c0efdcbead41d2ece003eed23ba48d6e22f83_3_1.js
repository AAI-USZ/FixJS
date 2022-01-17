function() {
      view = new cdb.admin.HeaderView({
        column: ['name', 'type'],
        template: "<label><a><%= col_name %></a></label><p><a><%= col_type %></a></p>"
      });
    }