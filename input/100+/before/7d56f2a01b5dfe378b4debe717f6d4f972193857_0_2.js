function updateRepositoryType() {
    var hostingType = $("#id_hosting_type")[0].value;
    var newRepoTypes = HOSTING_SERVICE_TOOLS[hostingType];

    var repoTypesEl = $("#id_tool");
    var currentRepoType = repoTypesEl[0].value;

    repoTypesEl.empty();

    $(origRepoTypes).each(function(i) {
        var repoType = origRepoTypes[i];

        if (newRepoTypes.length == 0 ||
            $.inArray(repoType.text, newRepoTypes) !== -1) {
            $("<option/>")
                .text(repoType.text)
                .val(repoType.value)
                .appendTo(repoTypesEl);

            if (repoType.value == currentRepoType) {
                repoTypesEl[0].value = currentRepoType;
            }
        }
    });

    updateFormDisplay("tool", TOOLS_FIELDS,
                      HOSTING_SERVICE_HIDDEN_FIELDS[hostingType]);
}