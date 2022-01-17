function(form) {
        var f = form.elements,
            flen = f.length,
            isRequired, noValidate = !!(form.attributes["novalidate"]);
        
        listen(form,"invalid",checkField,true);
        listen(form,"blur",checkField,true);
        listen(form,"input",checkField,true);
        listen(form,"keyup",checkField,true);
        listen(form,"focus",checkField,true);
        
        listen(form,"submit",function(e){
            isSubmit = true;
            if(!noValidate && !form.checkValidity()) {
                preventActions(e);
            }
        },false);
        
        if(!support()) { 
            form.checkValidity = function() { return checkValidity(form); };
            
            while(flen--) {
                isRequired = !!(f[flen].attributes["required"]);
                // Firefox includes fieldsets inside elements nodelist so we filter it out.
                if(f[flen].nodeName !== "FIELDSET") {
                    validity(f[flen]); // Add validity object to field
                }
            }
        }
    }