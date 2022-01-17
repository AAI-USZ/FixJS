function () {
              this.use(e.name, e.options);
              this.string('title', { minLength: 1 });
              this.parent('Repository');
            }