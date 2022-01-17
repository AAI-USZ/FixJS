function(value, field, queueEntry) {
            Curriki.ui.login.liveValidation.notifyValidationResult(field, "waiting");
            Curriki.Ajax.beforerequest = function() {};
            var r;
            console.log("launching check field request " + field + " of name " + field.dom.name);
            if(field.dom && field.dom.name && field.dom.name=="postalCode") {
                r = Ext.Ajax.request({
                    url: "/solr/locations"
                    ,method:'GET'
                    ,headers: { 'Accept':'application/json' ,'Content-type':'application/json' }
                    ,params: { 'q':"postalCode:" + field.dom.value,
                        "fl": "cityName,stateCode,long,lati", rows:1}
                    ,scope:this
                    ,success:function(response, options){
                        var json = response.responseText;
                        var results = json.evalJSON(true);
                        if(console) console.log("Results: ",results);
                        window.results = results;

                        var docs = results.response.docs;
                        if(!docs || docs.length==0 || !(docs[0].cityName && docs[0].stateCode)) {
                            if(console) console.log("Docs returned unusable.",docs);
                            Ext.get("postalCode_results").dom.innerHTML = "-";
                            Curriki.ui.login.liveValidation.notifyValidationResult(field, false);
                        } else {
                            var d = docs[0];
                            if(console) console.log(d.cityName + " " + d.stateCode, d);
                            Curriki.ui.login.liveValidation.updatePostalCodeResult(d.cityName, d.stateCode, d['long'], d['lati']);
                            Curriki.ui.login.liveValidation.notifyValidationResult(field, true);
                        }
                    }
                    ,failure:function(response, options){
                        console.error('Cannot resolve location', response, options);
                    }
                });
            } else {
                r = Ext.Ajax.request({
                    url: "/xwiki/bin/view/Registration/CheckValid"
                    ,headers: {'Accept':'application/json'}
                    ,method: "GET"
                    ,failure:function(response, options) {
                        Curriki.ui.login.liveValidation.queriedValue=queueEntry.value;
                        Curriki.ui.login.liveValidation.notifyValidationResult(field, null);
                        Curriki.console.log("failed validation: ", response, options);
                    }
                    ,success:function(response, options){
                        var t = response.responseText;
                        if(t) t = t.trim();
                        Curriki.console.log("Response: " + t);
                        queue.remove(queueEntry);
                        if(queueEntry.value!=field.getValue()) return;
                        Curriki.ui.login.liveValidation.notifyValidationResult(field, "true" == t);
                    }
                    , params: { what: field.dom.name,
                        value: value,
                        xpage: "plain"
                    }
                    , scope: this
                });
            }
            return r;
        }