function find_value_and_highlight_term(template, value, term) {
            if (term && term != "")
                return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
            else
                return template;
        }