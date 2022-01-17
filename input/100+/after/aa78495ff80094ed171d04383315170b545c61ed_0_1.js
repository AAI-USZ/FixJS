function(cursor)
    {
        var cursorOnEnter = cursor;
        var gotoCase = 1;
        var YYMARKER;
        while (1) {
            switch (gotoCase)
            // Following comment is replaced with generated state machine.
            
        {
            case 1: var yych;
            var yyaccept = 0;
            if (this.getLexCondition() < 2) {
                if (this.getLexCondition() < 1) {
                    { gotoCase = this.case_INITIAL; continue; };
                } else {
                    { gotoCase = this.case_COMMENT; continue; };
                }
            } else {
                if (this.getLexCondition() < 3) {
                    { gotoCase = this.case_DSTRING; continue; };
                } else {
                    { gotoCase = this.case_SSTRING; continue; };
                }
            }
/* *********************************** */
case this.case_COMMENT:

            yych = this._charAt(cursor);
            if (yych <= '\f') {
                if (yych == '\n') { gotoCase = 4; continue; };
                { gotoCase = 3; continue; };
            } else {
                if (yych <= '\r') { gotoCase = 4; continue; };
                if (yych == '*') { gotoCase = 6; continue; };
                { gotoCase = 3; continue; };
            }
case 2:
            { this.tokenType = "css-comment"; return cursor; }
case 3:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            { gotoCase = 12; continue; };
case 4:
            ++cursor;
            { this.tokenType = null; return cursor; }
case 6:
            yyaccept = 1;
            yych = this._charAt(YYMARKER = ++cursor);
            if (yych == '*') { gotoCase = 9; continue; };
            if (yych != '/') { gotoCase = 11; continue; };
case 7:
            ++cursor;
            this.setLexCondition(this._lexConditions.INITIAL);
            { this.tokenType = "css-comment"; return cursor; }
case 9:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych == '*') { gotoCase = 9; continue; };
            if (yych == '/') { gotoCase = 7; continue; };
case 11:
            yyaccept = 0;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
case 12:
            if (yych <= '\f') {
                if (yych == '\n') { gotoCase = 2; continue; };
                { gotoCase = 11; continue; };
            } else {
                if (yych <= '\r') { gotoCase = 2; continue; };
                if (yych == '*') { gotoCase = 9; continue; };
                { gotoCase = 11; continue; };
            }
/* *********************************** */
case this.case_DSTRING:
            yych = this._charAt(cursor);
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 17; continue; };
                if (yych <= '\f') { gotoCase = 16; continue; };
                { gotoCase = 17; continue; };
            } else {
                if (yych <= '"') {
                    if (yych <= '!') { gotoCase = 16; continue; };
                    { gotoCase = 19; continue; };
                } else {
                    if (yych == '\\') { gotoCase = 21; continue; };
                    { gotoCase = 16; continue; };
                }
            }
case 15:
            { return this._stringToken(cursor); }
case 16:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            { gotoCase = 23; continue; };
case 17:
            ++cursor;
case 18:
            { this.tokenType = null; return cursor; }
case 19:
            ++cursor;
case 20:
            this.setLexCondition(this._lexConditions.INITIAL);
            { return this._stringToken(cursor, true); }
case 21:
            yych = this._charAt(++cursor);
            if (yych <= 'e') {
                if (yych <= '\'') {
                    if (yych == '"') { gotoCase = 22; continue; };
                    if (yych <= '&') { gotoCase = 18; continue; };
                } else {
                    if (yych <= '\\') {
                        if (yych <= '[') { gotoCase = 18; continue; };
                    } else {
                        if (yych != 'b') { gotoCase = 18; continue; };
                    }
                }
            } else {
                if (yych <= 'r') {
                    if (yych <= 'm') {
                        if (yych >= 'g') { gotoCase = 18; continue; };
                    } else {
                        if (yych <= 'n') { gotoCase = 22; continue; };
                        if (yych <= 'q') { gotoCase = 18; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych <= 's') { gotoCase = 18; continue; };
                    } else {
                        if (yych != 'v') { gotoCase = 18; continue; };
                    }
                }
            }
case 22:
            yyaccept = 0;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
case 23:
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 15; continue; };
                if (yych <= '\f') { gotoCase = 22; continue; };
                { gotoCase = 15; continue; };
            } else {
                if (yych <= '"') {
                    if (yych <= '!') { gotoCase = 22; continue; };
                    { gotoCase = 26; continue; };
                } else {
                    if (yych != '\\') { gotoCase = 22; continue; };
                }
            }
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= 'e') {
                if (yych <= '\'') {
                    if (yych == '"') { gotoCase = 22; continue; };
                    if (yych >= '\'') { gotoCase = 22; continue; };
                } else {
                    if (yych <= '\\') {
                        if (yych >= '\\') { gotoCase = 22; continue; };
                    } else {
                        if (yych == 'b') { gotoCase = 22; continue; };
                    }
                }
            } else {
                if (yych <= 'r') {
                    if (yych <= 'm') {
                        if (yych <= 'f') { gotoCase = 22; continue; };
                    } else {
                        if (yych <= 'n') { gotoCase = 22; continue; };
                        if (yych >= 'r') { gotoCase = 22; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych >= 't') { gotoCase = 22; continue; };
                    } else {
                        if (yych == 'v') { gotoCase = 22; continue; };
                    }
                }
            }
            cursor = YYMARKER;
            { gotoCase = 15; continue; };
case 26:
            ++cursor;
            yych = this._charAt(cursor);
            { gotoCase = 20; continue; };
/* *********************************** */
case this.case_INITIAL:
            yych = this._charAt(cursor);
            if (yych <= ';') {
                if (yych <= '\'') {
                    if (yych <= '"') {
                        if (yych <= ' ') { gotoCase = 29; continue; };
                        if (yych <= '!') { gotoCase = 31; continue; };
                        { gotoCase = 33; continue; };
                    } else {
                        if (yych <= '#') { gotoCase = 34; continue; };
                        if (yych <= '$') { gotoCase = 31; continue; };
                        if (yych >= '\'') { gotoCase = 35; continue; };
                    }
                } else {
                    if (yych <= '.') {
                        if (yych <= ',') { gotoCase = 29; continue; };
                        if (yych <= '-') { gotoCase = 36; continue; };
                        { gotoCase = 37; continue; };
                    } else {
                        if (yych <= '/') { gotoCase = 38; continue; };
                        if (yych <= '9') { gotoCase = 39; continue; };
                        if (yych <= ':') { gotoCase = 41; continue; };
                        { gotoCase = 43; continue; };
                    }
                }
            } else {
                if (yych <= '^') {
                    if (yych <= '?') {
                        if (yych == '=') { gotoCase = 31; continue; };
                    } else {
                        if (yych == '\\') { gotoCase = 29; continue; };
                        if (yych <= ']') { gotoCase = 31; continue; };
                    }
                } else {
                    if (yych <= 'z') {
                        if (yych != '`') { gotoCase = 31; continue; };
                    } else {
                        if (yych <= '{') { gotoCase = 45; continue; };
                        if (yych == '}') { gotoCase = 47; continue; };
                    }
                }
            }
case 29:
            ++cursor;
case 30:
            { this.tokenType = null; return cursor; }
case 31:
            ++cursor;
            yych = this._charAt(cursor);
            { gotoCase = 50; continue; };
case 32:
            {
                    var token = this._line.substring(cursorOnEnter, cursor);
                    if (this._condition.parseCondition === this._parseConditions.INITIAL) {
                        if (token === "@media") {
                            this.tokenType = "css-at-rule";
                            this._condition.parseCondition = this._parseConditions.AT_MEDIA_RULE;
                        } else if (token.startsWith("@")) {
                            this.tokenType = "css-at-rule";
                            this._condition.parseCondition = this._parseConditions.AT_RULE;
                        } else
                            this.tokenType = "css-selector";
                    } else if ((this._condition.parseCondition === this._parseConditions.AT_MEDIA_RULE || this._condition.parseCondition === this._parseConditions.AT_RULE) && token in this._mediaTypes)
                        this.tokenType = "css-keyword";
                    else if (this._condition.parseCondition === this._parseConditions.PROPERTY && token in this._propertyKeywords)
                        this.tokenType = "css-property";
                    else if (this._isPropertyValue()) {
                        if (token in this._valueKeywords)
                            this.tokenType = "css-keyword";
                        else if (token in this._colorKeywords) {
                            // FIXME: this does not convert tokens toLowerCase() for the sake of speed.
                            this.tokenType = "css-color";
                        } else if (token === "!important")
                            this.tokenType = "css-important";
                    } else
                        this.tokenType = null;
                    return cursor;
                }
case 33:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            if (yych <= '-') {
                if (yych <= '!') {
                    if (yych <= '\f') {
                        if (yych == '\n') { gotoCase = 32; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych <= '\r') { gotoCase = 32; continue; };
                        if (yych <= ' ') { gotoCase = 128; continue; };
                        { gotoCase = 126; continue; };
                    }
                } else {
                    if (yych <= '$') {
                        if (yych <= '"') { gotoCase = 115; continue; };
                        if (yych <= '#') { gotoCase = 128; continue; };
                        { gotoCase = 126; continue; };
                    } else {
                        if (yych == '\'') { gotoCase = 126; continue; };
                        if (yych <= ',') { gotoCase = 128; continue; };
                        { gotoCase = 126; continue; };
                    }
                }
            } else {
                if (yych <= '[') {
                    if (yych <= '<') {
                        if (yych <= '.') { gotoCase = 128; continue; };
                        if (yych <= '9') { gotoCase = 126; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych <= '=') { gotoCase = 126; continue; };
                        if (yych <= '?') { gotoCase = 128; continue; };
                        { gotoCase = 126; continue; };
                    }
                } else {
                    if (yych <= '^') {
                        if (yych <= '\\') { gotoCase = 130; continue; };
                        if (yych <= ']') { gotoCase = 126; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych == '`') { gotoCase = 128; continue; };
                        if (yych <= 'z') { gotoCase = 126; continue; };
                        { gotoCase = 128; continue; };
                    }
                }
            }
case 34:
            yych = this._charAt(++cursor);
            if (yych <= '@') {
                if (yych <= '/') { gotoCase = 30; continue; };
                if (yych <= '9') { gotoCase = 123; continue; };
                { gotoCase = 30; continue; };
            } else {
                if (yych <= 'F') { gotoCase = 123; continue; };
                if (yych <= '`') { gotoCase = 30; continue; };
                if (yych <= 'f') { gotoCase = 123; continue; };
                { gotoCase = 30; continue; };
            }
case 35:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            if (yych <= '-') {
                if (yych <= '"') {
                    if (yych <= '\f') {
                        if (yych == '\n') { gotoCase = 32; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '\r') { gotoCase = 32; continue; };
                        if (yych <= ' ') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                } else {
                    if (yych <= '&') {
                        if (yych == '$') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '\'') { gotoCase = 115; continue; };
                        if (yych <= ',') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                }
            } else {
                if (yych <= '[') {
                    if (yych <= '<') {
                        if (yych <= '.') { gotoCase = 117; continue; };
                        if (yych <= '9') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '=') { gotoCase = 113; continue; };
                        if (yych <= '?') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                } else {
                    if (yych <= '^') {
                        if (yych <= '\\') { gotoCase = 119; continue; };
                        if (yych <= ']') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych == '`') { gotoCase = 117; continue; };
                        if (yych <= 'z') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    }
                }
            }
case 36:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            if (yych == '.') { gotoCase = 66; continue; };
            if (yych <= '/') { gotoCase = 50; continue; };
            if (yych <= '9') { gotoCase = 51; continue; };
            { gotoCase = 50; continue; };
case 37:
            yych = this._charAt(++cursor);
            if (yych <= '/') { gotoCase = 30; continue; };
            if (yych <= '9') { gotoCase = 69; continue; };
            { gotoCase = 30; continue; };
case 38:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            if (yych == '*') { gotoCase = 105; continue; };
            { gotoCase = 50; continue; };
case 39:
            yyaccept = 1;
            yych = this._charAt(YYMARKER = ++cursor);
            switch (yych) {
            case '!':
            case '"':
            case '$':
            case '\'':
            case '-':
            case '/':
            case '=':
            case '@':
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
            case '[':
            case ']':
            case 'a':
            case 'b':
            case 'f':
            case 'h':
            case 'j':
            case 'l':
            case 'n':
            case 'o':
            case 'q':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':    { gotoCase = 49; continue; };
            case '%':    { gotoCase = 68; continue; };
            case '.':    { gotoCase = 66; continue; };
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':    { gotoCase = 51; continue; };
            case 'H':    { gotoCase = 53; continue; };
            case '_':    { gotoCase = 54; continue; };
            case 'c':    { gotoCase = 55; continue; };
            case 'd':    { gotoCase = 56; continue; };
            case 'e':    { gotoCase = 57; continue; };
            case 'g':    { gotoCase = 58; continue; };
            case 'i':    { gotoCase = 59; continue; };
            case 'k':    { gotoCase = 60; continue; };
            case 'm':    { gotoCase = 61; continue; };
            case 'p':    { gotoCase = 62; continue; };
            case 'r':    { gotoCase = 63; continue; };
            case 's':    { gotoCase = 64; continue; };
            case 't':    { gotoCase = 65; continue; };
            default:    { gotoCase = 40; continue; };
            }
case 40:
            {
                    if (this._isPropertyValue())
                        this.tokenType = "css-number";
                    else
                        this.tokenType = null;
                    return cursor;
                }
case 41:
            ++cursor;
            {
                    this.tokenType = null;
                    if (this._condition.parseCondition === this._parseConditions.PROPERTY)
                        this._condition.parseCondition = this._parseConditions.PROPERTY_VALUE;
                    return cursor;
                }
case 43:
            ++cursor;
            {
                    this.tokenType = null;
                    if (this._condition.parseCondition === this._parseConditions.AT_RULE)
                        this._condition.parseCondition = this._parseConditions.INITIAL;
                    else
                        this._condition.parseCondition = this._parseConditions.PROPERTY;
                    return cursor;
                }
case 45:
            ++cursor;
            {
                    this.tokenType = "block-start";
                    if (this._condition.parseCondition === this._parseConditions.AT_MEDIA_RULE)
                        this._condition.parseCondition = this._parseConditions.INITIAL;
                    else
                        this._condition.parseCondition = this._parseConditions.PROPERTY;
                    return cursor;
                }
case 47:
            ++cursor;
            {
                    this.tokenType = "block-end";
                    this._condition.parseCondition = this._parseConditions.INITIAL;
                    return cursor;
                }
case 49:
            ++cursor;
            yych = this._charAt(cursor);
case 50:
            if (yych <= '9') {
                if (yych <= '&') {
                    if (yych <= '"') {
                        if (yych <= ' ') { gotoCase = 32; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych == '$') { gotoCase = 49; continue; };
                        { gotoCase = 32; continue; };
                    }
                } else {
                    if (yych <= ',') {
                        if (yych <= '\'') { gotoCase = 49; continue; };
                        { gotoCase = 32; continue; };
                    } else {
                        if (yych == '.') { gotoCase = 32; continue; };
                        { gotoCase = 49; continue; };
                    }
                }
            } else {
                if (yych <= '\\') {
                    if (yych <= '=') {
                        if (yych <= '<') { gotoCase = 32; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '?') { gotoCase = 32; continue; };
                        if (yych <= '[') { gotoCase = 49; continue; };
                        { gotoCase = 32; continue; };
                    }
                } else {
                    if (yych <= '_') {
                        if (yych == '^') { gotoCase = 32; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '`') { gotoCase = 32; continue; };
                        if (yych <= 'z') { gotoCase = 49; continue; };
                        { gotoCase = 32; continue; };
                    }
                }
            }
case 51:
            yyaccept = 1;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
            switch (yych) {
            case '!':
            case '"':
            case '$':
            case '\'':
            case '-':
            case '/':
            case '=':
            case '@':
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
            case '[':
            case ']':
            case 'a':
            case 'b':
            case 'f':
            case 'h':
            case 'j':
            case 'l':
            case 'n':
            case 'o':
            case 'q':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':    { gotoCase = 49; continue; };
            case '%':    { gotoCase = 68; continue; };
            case '.':    { gotoCase = 66; continue; };
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':    { gotoCase = 51; continue; };
            case 'H':    { gotoCase = 53; continue; };
            case '_':    { gotoCase = 54; continue; };
            case 'c':    { gotoCase = 55; continue; };
            case 'd':    { gotoCase = 56; continue; };
            case 'e':    { gotoCase = 57; continue; };
            case 'g':    { gotoCase = 58; continue; };
            case 'i':    { gotoCase = 59; continue; };
            case 'k':    { gotoCase = 60; continue; };
            case 'm':    { gotoCase = 61; continue; };
            case 'p':    { gotoCase = 62; continue; };
            case 'r':    { gotoCase = 63; continue; };
            case 's':    { gotoCase = 64; continue; };
            case 't':    { gotoCase = 65; continue; };
            default:    { gotoCase = 40; continue; };
            }
case 53:
            yych = this._charAt(++cursor);
            if (yych == 'z') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 54:
            yych = this._charAt(++cursor);
            if (yych == '_') { gotoCase = 102; continue; };
            { gotoCase = 50; continue; };
case 55:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 56:
            yych = this._charAt(++cursor);
            if (yych == 'e') { gotoCase = 101; continue; };
            { gotoCase = 50; continue; };
case 57:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 64; continue; };
            if (yych == 'x') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 58:
            yych = this._charAt(++cursor);
            if (yych == 'r') { gotoCase = 99; continue; };
            { gotoCase = 50; continue; };
case 59:
            yych = this._charAt(++cursor);
            if (yych == 'n') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 60:
            yych = this._charAt(++cursor);
            if (yych == 'H') { gotoCase = 98; continue; };
            { gotoCase = 50; continue; };
case 61:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 64; continue; };
            if (yych == 's') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 62:
            yych = this._charAt(++cursor);
            if (yych <= 's') {
                if (yych == 'c') { gotoCase = 64; continue; };
                { gotoCase = 50; continue; };
            } else {
                if (yych <= 't') { gotoCase = 64; continue; };
                if (yych == 'x') { gotoCase = 64; continue; };
                { gotoCase = 50; continue; };
            }
case 63:
            yych = this._charAt(++cursor);
            if (yych == 'a') { gotoCase = 96; continue; };
            if (yych == 'e') { gotoCase = 97; continue; };
            { gotoCase = 50; continue; };
case 64:
            yych = this._charAt(++cursor);
            if (yych <= '9') {
                if (yych <= '&') {
                    if (yych <= '"') {
                        if (yych <= ' ') { gotoCase = 40; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych == '$') { gotoCase = 49; continue; };
                        { gotoCase = 40; continue; };
                    }
                } else {
                    if (yych <= ',') {
                        if (yych <= '\'') { gotoCase = 49; continue; };
                        { gotoCase = 40; continue; };
                    } else {
                        if (yych == '.') { gotoCase = 40; continue; };
                        { gotoCase = 49; continue; };
                    }
                }
            } else {
                if (yych <= '\\') {
                    if (yych <= '=') {
                        if (yych <= '<') { gotoCase = 40; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '?') { gotoCase = 40; continue; };
                        if (yych <= '[') { gotoCase = 49; continue; };
                        { gotoCase = 40; continue; };
                    }
                } else {
                    if (yych <= '_') {
                        if (yych == '^') { gotoCase = 40; continue; };
                        { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '`') { gotoCase = 40; continue; };
                        if (yych <= 'z') { gotoCase = 49; continue; };
                        { gotoCase = 40; continue; };
                    }
                }
            }
case 65:
            yych = this._charAt(++cursor);
            if (yych == 'u') { gotoCase = 94; continue; };
            { gotoCase = 50; continue; };
case 66:
            yych = this._charAt(++cursor);
            if (yych <= '/') { gotoCase = 67; continue; };
            if (yych <= '9') { gotoCase = 69; continue; };
case 67:
            cursor = YYMARKER;
            if (yyaccept <= 0) {
                { gotoCase = 32; continue; };
            } else {
                { gotoCase = 40; continue; };
            }
case 68:
            yych = this._charAt(++cursor);
            { gotoCase = 40; continue; };
case 69:
            yyaccept = 1;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
            if (yych <= 'f') {
                if (yych <= 'H') {
                    if (yych <= '/') {
                        if (yych == '%') { gotoCase = 68; continue; };
                        { gotoCase = 40; continue; };
                    } else {
                        if (yych <= '9') { gotoCase = 69; continue; };
                        if (yych <= 'G') { gotoCase = 40; continue; };
                        { gotoCase = 81; continue; };
                    }
                } else {
                    if (yych <= 'b') {
                        if (yych == '_') { gotoCase = 73; continue; };
                        { gotoCase = 40; continue; };
                    } else {
                        if (yych <= 'c') { gotoCase = 75; continue; };
                        if (yych <= 'd') { gotoCase = 78; continue; };
                        if (yych >= 'f') { gotoCase = 40; continue; };
                    }
                }
            } else {
                if (yych <= 'm') {
                    if (yych <= 'i') {
                        if (yych <= 'g') { gotoCase = 79; continue; };
                        if (yych <= 'h') { gotoCase = 40; continue; };
                        { gotoCase = 77; continue; };
                    } else {
                        if (yych == 'k') { gotoCase = 82; continue; };
                        if (yych <= 'l') { gotoCase = 40; continue; };
                        { gotoCase = 76; continue; };
                    }
                } else {
                    if (yych <= 'q') {
                        if (yych == 'p') { gotoCase = 74; continue; };
                        { gotoCase = 40; continue; };
                    } else {
                        if (yych <= 'r') { gotoCase = 72; continue; };
                        if (yych <= 's') { gotoCase = 68; continue; };
                        if (yych <= 't') { gotoCase = 80; continue; };
                        { gotoCase = 40; continue; };
                    }
                }
            }
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 68; continue; };
            if (yych == 'x') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 72:
            yych = this._charAt(++cursor);
            if (yych == 'a') { gotoCase = 92; continue; };
            if (yych == 'e') { gotoCase = 93; continue; };
            { gotoCase = 67; continue; };
case 73:
            yych = this._charAt(++cursor);
            if (yych == '_') { gotoCase = 89; continue; };
            { gotoCase = 67; continue; };
case 74:
            yych = this._charAt(++cursor);
            if (yych <= 's') {
                if (yych == 'c') { gotoCase = 68; continue; };
                { gotoCase = 67; continue; };
            } else {
                if (yych <= 't') { gotoCase = 68; continue; };
                if (yych == 'x') { gotoCase = 68; continue; };
                { gotoCase = 67; continue; };
            }
case 75:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 76:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 68; continue; };
            if (yych == 's') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 77:
            yych = this._charAt(++cursor);
            if (yych == 'n') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 78:
            yych = this._charAt(++cursor);
            if (yych == 'e') { gotoCase = 88; continue; };
            { gotoCase = 67; continue; };
case 79:
            yych = this._charAt(++cursor);
            if (yych == 'r') { gotoCase = 86; continue; };
            { gotoCase = 67; continue; };
case 80:
            yych = this._charAt(++cursor);
            if (yych == 'u') { gotoCase = 84; continue; };
            { gotoCase = 67; continue; };
case 81:
            yych = this._charAt(++cursor);
            if (yych == 'z') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 82:
            yych = this._charAt(++cursor);
            if (yych != 'H') { gotoCase = 67; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'z') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 84:
            yych = this._charAt(++cursor);
            if (yych != 'r') { gotoCase = 67; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'n') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 86:
            yych = this._charAt(++cursor);
            if (yych != 'a') { gotoCase = 67; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'd') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 88:
            yych = this._charAt(++cursor);
            if (yych == 'g') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 89:
            yych = this._charAt(++cursor);
            if (yych != 'q') { gotoCase = 67; continue; };
            yych = this._charAt(++cursor);
            if (yych != 'e') { gotoCase = 67; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 92:
            yych = this._charAt(++cursor);
            if (yych == 'd') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 93:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 68; continue; };
            { gotoCase = 67; continue; };
case 94:
            yych = this._charAt(++cursor);
            if (yych != 'r') { gotoCase = 50; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'n') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 96:
            yych = this._charAt(++cursor);
            if (yych == 'd') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 97:
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 98:
            yych = this._charAt(++cursor);
            if (yych == 'z') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 99:
            yych = this._charAt(++cursor);
            if (yych != 'a') { gotoCase = 50; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'd') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 101:
            yych = this._charAt(++cursor);
            if (yych == 'g') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 102:
            yych = this._charAt(++cursor);
            if (yych != 'q') { gotoCase = 50; continue; };
            yych = this._charAt(++cursor);
            if (yych != 'e') { gotoCase = 50; continue; };
            yych = this._charAt(++cursor);
            if (yych == 'm') { gotoCase = 64; continue; };
            { gotoCase = 50; continue; };
case 105:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '\f') {
                if (yych == '\n') { gotoCase = 109; continue; };
                { gotoCase = 105; continue; };
            } else {
                if (yych <= '\r') { gotoCase = 109; continue; };
                if (yych != '*') { gotoCase = 105; continue; };
            }
case 107:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych == '*') { gotoCase = 107; continue; };
            if (yych == '/') { gotoCase = 111; continue; };
            { gotoCase = 105; continue; };
case 109:
            ++cursor;
            this.setLexCondition(this._lexConditions.COMMENT);
            { this.tokenType = "css-comment"; return cursor; }
case 111:
            ++cursor;
            { this.tokenType = "css-comment"; return cursor; }
case 113:
            yyaccept = 0;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '-') {
                if (yych <= '"') {
                    if (yych <= '\f') {
                        if (yych == '\n') { gotoCase = 32; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '\r') { gotoCase = 32; continue; };
                        if (yych <= ' ') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                } else {
                    if (yych <= '&') {
                        if (yych == '$') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '\'') { gotoCase = 115; continue; };
                        if (yych <= ',') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                }
            } else {
                if (yych <= '[') {
                    if (yych <= '<') {
                        if (yych <= '.') { gotoCase = 117; continue; };
                        if (yych <= '9') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych <= '=') { gotoCase = 113; continue; };
                        if (yych <= '?') { gotoCase = 117; continue; };
                        { gotoCase = 113; continue; };
                    }
                } else {
                    if (yych <= '^') {
                        if (yych <= '\\') { gotoCase = 119; continue; };
                        if (yych <= ']') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych == '`') { gotoCase = 117; continue; };
                        if (yych <= 'z') { gotoCase = 113; continue; };
                        { gotoCase = 117; continue; };
                    }
                }
            }
case 115:
            ++cursor;
            if ((yych = this._charAt(cursor)) <= '9') {
                if (yych <= '&') {
                    if (yych <= '"') {
                        if (yych >= '!') { gotoCase = 49; continue; };
                    } else {
                        if (yych == '$') { gotoCase = 49; continue; };
                    }
                } else {
                    if (yych <= ',') {
                        if (yych <= '\'') { gotoCase = 49; continue; };
                    } else {
                        if (yych != '.') { gotoCase = 49; continue; };
                    }
                }
            } else {
                if (yych <= '\\') {
                    if (yych <= '=') {
                        if (yych >= '=') { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '?') { gotoCase = 116; continue; };
                        if (yych <= '[') { gotoCase = 49; continue; };
                    }
                } else {
                    if (yych <= '_') {
                        if (yych != '^') { gotoCase = 49; continue; };
                    } else {
                        if (yych <= '`') { gotoCase = 116; continue; };
                        if (yych <= 'z') { gotoCase = 49; continue; };
                    }
                }
            }
case 116:
            { return this._stringToken(cursor, true); }
case 117:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 67; continue; };
                if (yych <= '\f') { gotoCase = 117; continue; };
                { gotoCase = 67; continue; };
            } else {
                if (yych <= '\'') {
                    if (yych <= '&') { gotoCase = 117; continue; };
                    { gotoCase = 122; continue; };
                } else {
                    if (yych != '\\') { gotoCase = 117; continue; };
                }
            }
case 119:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= 'a') {
                if (yych <= '!') {
                    if (yych <= '\n') {
                        if (yych <= '\t') { gotoCase = 67; continue; };
                    } else {
                        if (yych != '\r') { gotoCase = 67; continue; };
                    }
                } else {
                    if (yych <= '\'') {
                        if (yych <= '"') { gotoCase = 117; continue; };
                        if (yych <= '&') { gotoCase = 67; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych == '\\') { gotoCase = 117; continue; };
                        { gotoCase = 67; continue; };
                    }
                }
            } else {
                if (yych <= 'q') {
                    if (yych <= 'f') {
                        if (yych <= 'b') { gotoCase = 117; continue; };
                        if (yych <= 'e') { gotoCase = 67; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych == 'n') { gotoCase = 117; continue; };
                        { gotoCase = 67; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych == 's') { gotoCase = 67; continue; };
                        { gotoCase = 117; continue; };
                    } else {
                        if (yych == 'v') { gotoCase = 117; continue; };
                        { gotoCase = 67; continue; };
                    }
                }
            }
            ++cursor;
            this.setLexCondition(this._lexConditions.SSTRING);
            { return this._stringToken(cursor); }
case 122:
            yych = this._charAt(++cursor);
            { gotoCase = 116; continue; };
case 123:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '@') {
                if (yych <= '/') { gotoCase = 125; continue; };
                if (yych <= '9') { gotoCase = 123; continue; };
            } else {
                if (yych <= 'F') { gotoCase = 123; continue; };
                if (yych <= '`') { gotoCase = 125; continue; };
                if (yych <= 'f') { gotoCase = 123; continue; };
            }
case 125:
            {
                    if (this._isPropertyValue())
                        this.tokenType = "css-color";
                    else
                        this.tokenType = null;
                    return cursor;
                }
case 126:
            yyaccept = 0;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '-') {
                if (yych <= '!') {
                    if (yych <= '\f') {
                        if (yych == '\n') { gotoCase = 32; continue; };
                    } else {
                        if (yych <= '\r') { gotoCase = 32; continue; };
                        if (yych >= '!') { gotoCase = 126; continue; };
                    }
                } else {
                    if (yych <= '$') {
                        if (yych <= '"') { gotoCase = 115; continue; };
                        if (yych >= '$') { gotoCase = 126; continue; };
                    } else {
                        if (yych == '\'') { gotoCase = 126; continue; };
                        if (yych >= '-') { gotoCase = 126; continue; };
                    }
                }
            } else {
                if (yych <= '[') {
                    if (yych <= '<') {
                        if (yych <= '.') { gotoCase = 128; continue; };
                        if (yych <= '9') { gotoCase = 126; continue; };
                    } else {
                        if (yych <= '=') { gotoCase = 126; continue; };
                        if (yych >= '@') { gotoCase = 126; continue; };
                    }
                } else {
                    if (yych <= '^') {
                        if (yych <= '\\') { gotoCase = 130; continue; };
                        if (yych <= ']') { gotoCase = 126; continue; };
                    } else {
                        if (yych == '`') { gotoCase = 128; continue; };
                        if (yych <= 'z') { gotoCase = 126; continue; };
                    }
                }
            }
case 128:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 67; continue; };
                if (yych <= '\f') { gotoCase = 128; continue; };
                { gotoCase = 67; continue; };
            } else {
                if (yych <= '"') {
                    if (yych <= '!') { gotoCase = 128; continue; };
                    { gotoCase = 122; continue; };
                } else {
                    if (yych != '\\') { gotoCase = 128; continue; };
                }
            }
case 130:
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= 'a') {
                if (yych <= '!') {
                    if (yych <= '\n') {
                        if (yych <= '\t') { gotoCase = 67; continue; };
                    } else {
                        if (yych != '\r') { gotoCase = 67; continue; };
                    }
                } else {
                    if (yych <= '\'') {
                        if (yych <= '"') { gotoCase = 128; continue; };
                        if (yych <= '&') { gotoCase = 67; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych == '\\') { gotoCase = 128; continue; };
                        { gotoCase = 67; continue; };
                    }
                }
            } else {
                if (yych <= 'q') {
                    if (yych <= 'f') {
                        if (yych <= 'b') { gotoCase = 128; continue; };
                        if (yych <= 'e') { gotoCase = 67; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych == 'n') { gotoCase = 128; continue; };
                        { gotoCase = 67; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych == 's') { gotoCase = 67; continue; };
                        { gotoCase = 128; continue; };
                    } else {
                        if (yych == 'v') { gotoCase = 128; continue; };
                        { gotoCase = 67; continue; };
                    }
                }
            }
            ++cursor;
            this.setLexCondition(this._lexConditions.DSTRING);
            { return this._stringToken(cursor); }
/* *********************************** */
case this.case_SSTRING:
            yych = this._charAt(cursor);
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 137; continue; };
                if (yych <= '\f') { gotoCase = 136; continue; };
                { gotoCase = 137; continue; };
            } else {
                if (yych <= '\'') {
                    if (yych <= '&') { gotoCase = 136; continue; };
                    { gotoCase = 139; continue; };
                } else {
                    if (yych == '\\') { gotoCase = 141; continue; };
                    { gotoCase = 136; continue; };
                }
            }
case 135:
            { return this._stringToken(cursor); }
case 136:
            yyaccept = 0;
            yych = this._charAt(YYMARKER = ++cursor);
            { gotoCase = 143; continue; };
case 137:
            ++cursor;
case 138:
            { this.tokenType = null; return cursor; }
case 139:
            ++cursor;
case 140:
            this.setLexCondition(this._lexConditions.INITIAL);
            { return this._stringToken(cursor, true); }
case 141:
            yych = this._charAt(++cursor);
            if (yych <= 'e') {
                if (yych <= '\'') {
                    if (yych == '"') { gotoCase = 142; continue; };
                    if (yych <= '&') { gotoCase = 138; continue; };
                } else {
                    if (yych <= '\\') {
                        if (yych <= '[') { gotoCase = 138; continue; };
                    } else {
                        if (yych != 'b') { gotoCase = 138; continue; };
                    }
                }
            } else {
                if (yych <= 'r') {
                    if (yych <= 'm') {
                        if (yych >= 'g') { gotoCase = 138; continue; };
                    } else {
                        if (yych <= 'n') { gotoCase = 142; continue; };
                        if (yych <= 'q') { gotoCase = 138; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych <= 's') { gotoCase = 138; continue; };
                    } else {
                        if (yych != 'v') { gotoCase = 138; continue; };
                    }
                }
            }
case 142:
            yyaccept = 0;
            YYMARKER = ++cursor;
            yych = this._charAt(cursor);
case 143:
            if (yych <= '\r') {
                if (yych == '\n') { gotoCase = 135; continue; };
                if (yych <= '\f') { gotoCase = 142; continue; };
                { gotoCase = 135; continue; };
            } else {
                if (yych <= '\'') {
                    if (yych <= '&') { gotoCase = 142; continue; };
                    { gotoCase = 146; continue; };
                } else {
                    if (yych != '\\') { gotoCase = 142; continue; };
                }
            }
            ++cursor;
            yych = this._charAt(cursor);
            if (yych <= 'e') {
                if (yych <= '\'') {
                    if (yych == '"') { gotoCase = 142; continue; };
                    if (yych >= '\'') { gotoCase = 142; continue; };
                } else {
                    if (yych <= '\\') {
                        if (yych >= '\\') { gotoCase = 142; continue; };
                    } else {
                        if (yych == 'b') { gotoCase = 142; continue; };
                    }
                }
            } else {
                if (yych <= 'r') {
                    if (yych <= 'm') {
                        if (yych <= 'f') { gotoCase = 142; continue; };
                    } else {
                        if (yych <= 'n') { gotoCase = 142; continue; };
                        if (yych >= 'r') { gotoCase = 142; continue; };
                    }
                } else {
                    if (yych <= 't') {
                        if (yych >= 't') { gotoCase = 142; continue; };
                    } else {
                        if (yych == 'v') { gotoCase = 142; continue; };
                    }
                }
            }
            cursor = YYMARKER;
            { gotoCase = 135; continue; };
case 146:
            ++cursor;
            yych = this._charAt(cursor);
            { gotoCase = 140; continue; };
        }

        }
    }