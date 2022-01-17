function() {
        this.modelBinder = new Backbone.ModelBinder();
        this.template = require('../../scripts/text!user_maintenance.html');
        this.viewModel = this.options.viewModel;
        this.model.on('change:email', this.SetGravatarImage, this);
        return this.model.get("departments").on('reset', this.departmentsLoaded, this);
      }