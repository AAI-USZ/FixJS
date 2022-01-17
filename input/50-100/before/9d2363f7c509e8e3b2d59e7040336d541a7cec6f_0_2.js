function(doc) {
      var tr = $('<tr />');
      self.el.find('tbody').append(tr);
      var newView = new my.DataTableRow({
          model: doc,
          el: tr,
          fields: self.fields,
        });
      newView.render();
    }