function(tag_obj){
            if(tag_obj.num != -1 && tag_obj.type != getPropertyName(PieceTypes, pieces[0].type)){return;}
            
            var label = null, tmp_tag = tag_obj.copyFrom(), types = tmp_tag.effect.toLowerCase().split(/\s*\+\s*/);
            types.forEach(function(type){
                var interpreter_type = type;
                if(type.search(/effect$/) != -1){
                    interpreter_type = "effect";
                    tmp_tag.effect = type;
                    this.child_interpreters["effect"].setObjs(label && [label] || pieces);
                }
                
                label = this.child_interpreters[interpreter_type].interpret(tmp_tag);
            }, this);
        }