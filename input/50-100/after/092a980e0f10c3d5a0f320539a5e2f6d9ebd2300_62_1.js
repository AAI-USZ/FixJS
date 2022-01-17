function setSearchFieldValue(prefix, initialString) {
        prefix = prefix || "";
        initialString = initialString || "";
        initialString = prefix + initialString;

        
        var $field = $("input#quickOpenSearch");
        if ($field) {
            $field.val(initialString);
            $field.get(0).setSelectionRange(prefix.length, initialString.length);
        }
    }