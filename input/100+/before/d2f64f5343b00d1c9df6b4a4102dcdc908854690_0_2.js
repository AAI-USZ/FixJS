function isConstituent(ch) {
                return ch.toLowerCase() != ch.toUpperCase() ||
                        /^[-0-9!#$%&*+./:<=>?@\[\]\^_\{\}~]$/i.test(ch);
        }