function(jqXHR, status, errorThrown) {
        $form.closest(".modal").modal("hide");
        horizon.alert("error", "There was an error submitting the form. Please try again.");
      }