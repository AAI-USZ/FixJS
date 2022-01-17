function(dojo,ComboBox, ItemFileReadStore, event,fx) {

            // create store instance
            // referencing data from states.json
            var stateStore = new ItemFileReadStore({
                url: "nutrition/macronutrients"
            });

            // create Select widget,
            // populating its options from the store
            var select = new ComboBox({
                name: "macronutrient_select",
                store: stateStore,
            }, "macronutrient_select");
            select.startup();

            function onAddMacroNutrient(){
                var macronutrient = select.get('value');
                stateStore.fetchItemByIdentity({identity:macronutrient,onItem:function(item){
                    console.log(item);
                    if(item){
                        var dosage = item.dosage[0];
                        addMacroNutrient(macronutrient, dosage);
                    }
                }});
            };

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
            function onClose(e){
                //console.log(e.target.parentNode);
                dojo.destroy(e.target.parentNode);
            }

                
            dojo.query(".form_btn").on("click", function(e) {
                try{
                    onAddMacroNutrient();
                }catch(err){
                    console.log(err);
                }
                event.stop(e);
                return false;
            });
            dojo.query(".closebtn").on("click", onClose);

        }