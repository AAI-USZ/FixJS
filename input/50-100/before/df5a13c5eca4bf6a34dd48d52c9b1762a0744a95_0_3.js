function () {
      if (this.value != base_type) {
        $("#id_" + this.value).closest(".control-group").hide();
      } else {
        $("#id_" + this.value).closest(".control-group").show();
      }
    }