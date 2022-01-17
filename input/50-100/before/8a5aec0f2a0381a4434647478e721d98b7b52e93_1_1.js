function() {
              this.use(e.name, e.options);
              this.string('name', { minLength: 1 });
              this.parent('Forum');
            }