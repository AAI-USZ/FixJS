function()
    {
        var image = this.getSelected();
        if (image == null) return;
        var button = 0;

        while (button == 0) {
            var values = this.core.promptInput('Purchase Instance', [{label:"Instance Details",type:"section"},
                                                                     {label:"Offer ID",type:"label",value:image.id},
                                                                     {label:"Instance Type",type:"label",value:image.instanceType},
                                                                     {label:"Instance Tenancy",type:"label",value:image.tenancy},
                                                                     {label:"Duration(years)",type:"label",value:image.duration},
                                                                     {label:"Availability Zone",type:"label",value:image.azone},
                                                                     {label:"Offering Type",type:"label",value:image.offeringType},
                                                                     {label:"Usage Price(US$)",type:"label",value:image.usagePrice},
                                                                     {label:"Recuring Charges(US$)",type:"label",value:image.recurringCharges},
                                                                     {label:"Product Description",type:"label",value:image.productDescription},
                                                                     {label:"One Time Payment",type:"section"},
                                                                     {label:"One time payment/Instance(US$)",type:"label",value:image.fixedPrice},
                                                                     {label:"Number of instances",type:"number",size:6,required:1,min:0,onkeyup:"rc.items[13].obj.value=parseInt(rc.items[12].obj.value)*" + image.fixedPrice},
                                                                     {label:"Total one time payment, due now",type:"label"} ])
            if (!values || !parseInt(values[12])) return;
            // Ensure that the user actually wants to purchase this offering
            var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
            var flags = prompts.BUTTON_TITLE_IS_STRING * prompts.BUTTON_POS_0 + prompts.BUTTON_TITLE_IS_STRING * prompts.BUTTON_POS_1 + prompts.BUTTON_TITLE_CANCEL * prompts.BUTTON_POS_2 + prompts.BUTTON_POS_0_DEFAULT;
            var msg = "You are about to purchase " + values[12] + " " + image.productDescription + " Reserved Instance(s) in the " + image.azone + " Availability Zone for $" + values[12] * parseInt(image.fixedPrice);
            msg = msg + ". Are you sure?\n\nAn email will be sent to you shortly after we receive your order.";
            button = prompts.confirmEx(window, "Confirm Reserved Instances Offering Purchase", msg, flags, "Edit Order", "Place Order", "", null, {});

            // Edit: 0, Purchase: 1, Cancel: 2
            if (button == 1) {
                this.core.api.purchaseOffering(image.id, values[12], function(id) { ew_ReservedInstancesTreeView.refresh(); });
            }
        }
    }