function () {
        ko.cleanNode($('#testContainer')[0]);
        $('#testContainer').empty();
        ko.validation.reset();
    }