function(ch, i){
                        if (ch == "x" || ch == "X") {
                                if (has_x) return false;
                                return has_x = true;
                        }
                        if (!has_x && (ch == "E" || ch == "e")) {
                                if (has_e) return false;
                                return has_e = after_e = true;
                        }
                        if (ch == "-") {
                                if (after_e || (i == 0 && !prefix)) return true;
                                return false;
                        }
                        if (ch == "+") return after_e;
                        after_e = false;
                        if (ch == ".") {
                                if (!has_dot && !has_x && !has_e)
                                        return has_dot = true;
                                return false;
                        }
                        return is_alphanumeric_char(ch);
                }