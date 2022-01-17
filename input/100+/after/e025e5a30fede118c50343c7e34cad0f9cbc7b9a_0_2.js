function(event){
            var name = event.property.text.toLowerCase();
            
            if (heightProperties[name] || widthProperties[name]){
                if (!/^0\S*$/.test(event.value) && !(name == "border" && event.value == "none")){
                    properties[name] = { line: event.property.line, col: event.property.col, value: event.value };
                }
            } else {
                if (/^(width|height)/i.test(name) && /^(length|percentage)/.test(event.value.parts[0].type)){
                    properties[name] = 1;
                }
            }
            
        }