function() {
      cdb.templates.add(new cdb.core.Template({
        name: 'table/views/table_header_view',
        compiled: _.template("<label><a><%= col_name %></a></label><p><a><%= col_type %></a></p>")
      }));

      cdb.templates.add(new cdb.core.Template({
        name: 'table/views/table_header_options',
        compiled: _.template("<ul></ul>")
      }));

      view = new cdb.admin.HeaderView({
        column: ['name', 'type'],
      });
    }