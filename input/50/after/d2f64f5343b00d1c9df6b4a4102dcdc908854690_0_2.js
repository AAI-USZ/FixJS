function isConstituent(ch) {
                        if (options.rx_special && options.rx_special.test(ch))
                                return false;
                        return ch.toLowerCase() != ch.toUpperCase() ||
                                /^[-|0-9!#$%&*+./:<=>?@\[\]\^_\{\}~]$/i.test(ch);
                }