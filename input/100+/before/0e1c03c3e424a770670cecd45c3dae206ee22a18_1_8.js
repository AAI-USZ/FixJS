function() {
      var defaults = {
        plugins: {
          halloformat: {},
          halloblock: {},
          hallolists: {},
          hallolink: {},
          halloimage: {
            entity: this.options.entity
          },
          halloindicator: {}
        },
        buttonCssClass: 'create-ui-btn-small',
        placeholder: '[' + this.options.property + ']'
      };

      if (typeof this.element.annotate === 'function' && this.options.vie.services.stanbol) {
        // Enable Hallo Annotate plugin by default if user has annotate.js
        // loaded and VIE has Stanbol enabled
        defaults.plugins.halloannotate = {
            vie: this.options.vie
        };
      }

      if (this.options.toolbarState === 'full') {
        // Use fixed toolbar in the Create tools area
        defaults.parentElement = jQuery('.create-ui-toolbar-dynamictoolarea .create-ui-tool-freearea');
        defaults.toolbar = 'halloToolbarFixed';
      } else {
        // Tools area minimized, use floating toolbar
        defaults.showAlways = false;
        defaults.toolbar = 'halloToolbarContextual';
      }

      var editorOptions = {};
      if (this.options.editorOptions[this.options.property]) {
        editorOptions = this.options.editorOptions[this.options.property];
      } else if (this.options.editorOptions['default']) {
        editorOptions = this.options.editorOptions['default'];
      }
      return _.extend(defaults, editorOptions);
    }