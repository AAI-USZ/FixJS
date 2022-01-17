function() {
        this.modelBinder = new Backbone.ModelBinder();
        this.template = require('../../scripts/text!user_maintenance.html');
        this.model.on('change:email', this.SetGravatarImage, this);
        this.model.get("departments").on('reset', this.departmentsLoaded, this);
        return this.model.on('validated:invalid', this.validationFailed, this);
      }