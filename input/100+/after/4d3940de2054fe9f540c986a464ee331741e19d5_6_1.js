function token(type, value, is_comment) {
                S.regex_allowed = ((type == "operator" && !HOP(UNARY_POSTFIX, value)) ||
                                   (type == "keyword" && HOP(KEYWORDS_BEFORE_EXPRESSION, value)) ||
                                   (type == "punc" && HOP(PUNC_BEFORE_EXPRESSION, value)));
                var ret = {
                        type   : type,
                        value  : value,
                        line   : S.tokline,
                        col    : S.tokcol,
                        pos    : S.tokpos,
                        endpos : S.pos,
                        nlb    : S.newline_before
                };
                if (!is_comment) {
                        ret.comments_before = S.comments_before;
                        S.comments_before = [];
                        // make note of any newlines in the comments that came before
                        for (var i = 0, len = ret.comments_before.length; i < len; i++) {
                                ret.nlb = ret.nlb || ret.comments_before[i].nlb;
                        }
                }
                S.newline_before = false;
                return ret;
        }