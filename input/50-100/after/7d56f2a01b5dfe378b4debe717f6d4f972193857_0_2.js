function(i) {
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
    }