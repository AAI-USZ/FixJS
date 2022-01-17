function(sql) {
      // reset options whiout changing raising a new fetchs
      this.options.set({
        page: 0,
        mode: 'asc',
        order_by: 'cartodb_id',
        filter_column: '',
        filter_value: ''
      }, { silent: true} );

      this.options.set({ sql :sql });
    }