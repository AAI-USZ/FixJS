function is_identifier_char(ch) {
        return is_identifier_start(ch)
                || is_unicode_combining_mark(ch)
                || is_digit(ch)
                || is_unicode_connector_punctuation(ch)
                || ch == "\u200c" // zero-width non-joiner <ZWNJ>
                || ch == "\u200d" // zero-width joiner <ZWJ> (in my ECMA-262 PDF, this is also 200c)
        ;
}