function(scope, elm, attrs, container) {
        var tab;
        tab = {
          title: scope.title,
          selected: function(newVal) {
            if (newVal == null) return scope.selected;
            return scope.selected = newVal;
          }
        };
        container.addTab(tab);
        return scope.$on('$destroy', function() {
          return container.removeTab(tab);
        });
      }