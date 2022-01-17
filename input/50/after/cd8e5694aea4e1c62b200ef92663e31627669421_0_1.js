function(item, index) {
            items.push('\n    ' + index + ': {' + itemtpl.apply(item) + '}');
        }