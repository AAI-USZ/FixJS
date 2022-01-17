function($input, $label) {
        if (!(this.present($label) && $label.is('label'))) {
          $label = this.find_label_for($input);
        }
        if (this.present($label)) {
          return $label;
        }
      }