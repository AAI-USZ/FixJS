function addMacroNutrient(macronutrient, dosage){
                var macronutrients_form = dojo.byId("macronutrients_form");
                var nutrients_found = dojo.query("input[name='"+macronutrient+"']");
                if(nutrients_found.length>0){
                    fx.highlight({node:nutrients_found[0]}).play();
                    fx.highlight({node:nutrients_found[0].parentNode}).play();
                }else{
                    var closebtn = dojo.query(".closebtn")[0];
                    var item = dojo.create('span',{
                        innerHTML:macronutrient,
                        'class':'nutrient'},
                        "macronutrients_form",'last');
                    dojo.create('input',{type:"text",name:macronutrient,value:dosage,size:"50"},item,'last');
                    dojo.create('img',{src:closebtn.src,'class':'closebtn'},item,'last');
                    dojo.query(".closebtn",item).on("click", onClose);
                }

            }