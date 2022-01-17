function() {
        var hostingType = hostingTypeEl[0].value,
            repoFormID = "repo-form-" + hostingType + "-" +
                         (repoPlanEl.val() || "default");

        repoForms.hide();
        $("#" + repoFormID).show();
    }