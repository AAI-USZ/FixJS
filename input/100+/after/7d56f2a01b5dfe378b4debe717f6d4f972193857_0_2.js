function updateRepositoryType() {
    var hostingType = $("#id_hosting_type")[0].value,
        newRepoTypes = (hostingType === "custom"
                        ? []
                        : HOSTING_SERVICES[hostingType].scmtools),
        repoTypesEl = $("#id_tool"),
        currentRepoType = repoTypesEl[0].value;

    repoTypesEl.empty();

    $(origRepoTypes).each(function(i) {
        var repoType = origRepoTypes[i];

        if (newRepoTypes.length === 0 ||
            $.inArray(repoType.text, newRepoTypes) !== -1) {
            $("<option/>")
                .text(repoType.text)
                .val(repoType.value)
                .appendTo(repoTypesEl);

            if (repoType.value === currentRepoType) {
                repoTypesEl[0].value = currentRepoType;
            }
        }
    });

    repoTypesEl.triggerHandler("change");
}