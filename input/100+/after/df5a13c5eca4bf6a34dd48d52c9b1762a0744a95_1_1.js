function () {
  $(document).on('submit', '#tail_length', function (evt) {
    horizon.instances.user_decided_length = true;
    horizon.instances.getConsoleLog(true);
    evt.preventDefault();
  });

  /* Launch instance workflow */

  // Handle field toggles for the Launch Instance source type field
  function update_launch_source_displayed_fields (field) {
    var $this = $(field),
        base_type = $this.val();

    $this.find("option").each(function () {
      if (this.value != base_type) {
        $("#id_" + this.value).closest(".control-group").hide();
      } else {
        $("#id_" + this.value).closest(".control-group").show();
      }
    });
  }

  $(document).on('change', '.workflow #id_source_type', function (evt) {
    update_launch_source_displayed_fields(this);
  });

  $('.workflow #id_source_type').change();
  horizon.modals.addModalInitFunction(function (modal) {
    $(modal).find("#id_source_type").change();
  });

  // Handle field toggles for the Launch Instance volume type field
  function update_launch_volume_displayed_fields (field) {
    var $this = $(field),
        volume_opt = $this.val(),
        $extra_fields = $("#id_delete_on_terminate, #id_device_name");

    $this.find("option").each(function () {
      if (this.value != volume_opt) {
        $("#id_" + this.value).closest(".control-group").hide();
      } else {
        $("#id_" + this.value).closest(".control-group").show();
      }
    });

    if (volume_opt === "volume_id" || volume_opt === "volume_snapshot_id") {
      $extra_fields.closest(".control-group").show();
    } else {
      $extra_fields.closest(".control-group").hide();
    }
  }
  $(document).on('change', '.workflow #id_volume_type', function (evt) {
    update_launch_volume_displayed_fields(this);
  });

  $('.workflow #id_volume_type').change();
  horizon.modals.addModalInitFunction(function (modal) {
    $(modal).find("#id_volume_type").change();
  });
}