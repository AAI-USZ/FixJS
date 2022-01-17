function(tag_obj){
            if(tag_obj.num != -1 && tag_obj.type != getPropertyName(PieceTypes, pieces[0].type)){return;}
            
            var label = null, tmp_tag = tag_obj.copyFrom(), types = tag_obj.effect.toLowerCase().split(/\s*\+\s*/);
            types.forEach(function(type){
                var interpreter_type = type;
                if(type.search(/effect$/) != -1){
                    interpreter_type = "effect";
                    tag_obj.effect = type;
                    this.child_interpreters["effect"].setObjs(label && [label] || pieces);
                }
                
                label = this.child_interpreters[interpreter_type].interpret(tmp_tag);
            }, this);
        }