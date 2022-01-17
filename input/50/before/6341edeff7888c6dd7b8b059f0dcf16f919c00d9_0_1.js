function() {
          return _this.$('.btn-primary').attr({
            disabled: !_this.getTreeRoot().isAttribute()
          });
        }