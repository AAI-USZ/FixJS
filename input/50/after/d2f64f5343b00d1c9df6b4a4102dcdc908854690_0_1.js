function read_multiline_comment() {
                        var comment = read_while(function(){
                                return !input.looking_at("|#");
                        });
                        skip(); skip();
                        return comment;
                }