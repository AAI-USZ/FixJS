function() {
      return this.model.get('aggregate_function' + this.number) || 'sum';
    }