function(prefix, className, text) {
            return $('<button id="' + prefix + className + '" ' +
                     'type="button" class="btn edit-geometry-small geo-edit ' + className + '">' +
                     text + '</button>');
        }