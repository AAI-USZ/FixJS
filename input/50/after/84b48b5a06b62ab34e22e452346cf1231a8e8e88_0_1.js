function(prefix, className, text) {
            var firstClass = className.split(' ', 1)[0];
            return $('<button id="' + prefix + firstClass + '" ' +
                     'type="button" class="btn edit-geometry-small geo-edit ' + className + '">' +
                     text + '</button>');
        }