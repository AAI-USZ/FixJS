function print_single_space() {

        if (last_type === 'TK_COMMENT') {
            // no you will not print just a space after a comment
            return print_newline(true);
        }

        if (flags.eat_next_space) {
            flags.eat_next_space = false;
            return;
        }
        var last_output = ' ';
        if (output.length) {
            last_output = output[output.length - 1];
        }
        if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
            output.push(' ');
        }
    }