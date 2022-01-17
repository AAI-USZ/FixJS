function (parent, child) {
              console.log(parent, child);
              child.destroy(this.callback);
            }