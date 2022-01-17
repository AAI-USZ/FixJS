function(type){
                var interpreter_type = type;
                this.child_interpreters["effect"].setPieces(pieces);
                if(type.search(/effect$/) != -1){
                    interpreter_type = "effect";
                    tmp_tag.effect = type;
                    this.child_interpreters["effect"].setObjs(label && [label] || pieces);
                }
                
                label = this.child_interpreters[interpreter_type].interpret(tmp_tag);
            }