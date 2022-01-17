function addMacroNutrient(macronutrient, dosage){
                var macronutrients_form = dojo.byId("macronutrients_form");
                var nutrients_found = dojo.query("input[name='"+macronutrient+"']");
                if(nutrients_found.length>0){
                    fx.highlight({node:nutrients_found[0]}).play();
                    fx.highlight({node:nutrients_found[0].parentNode}).play();
                }else{
                    var item = dojo.create('span',{
                        'class':'nutrient',
                        innerHTML:macronutrient+': <input type="text" name="'+macronutrient+'" value="'+dosage+'" size="50"/>'
                            +'<img src="{{STATIC_PREFIX}}images/close.png" class="closebtn"></img>'},
                        "macronutrients_form",'last');
                    dojo.query(".closebtn",item).on("click", onClose);
                }

            }