function() {
	   var kill_port = function(host_string) {
	       return host_string.search(/:\d+/g) >= 0 ?  host_string.slice(0,host_string.indexOf(':')) : host_string;
	   };
        var fetch_by_proxy = function(url,proxy_url) {
            proxy_url = proxy_url || "http://"+ kill_port(document.location.host) + ":9292";
            return $.get(proxy_url, { url : url });
        };
        var modelsbyuri = {};
        
        var Model = Backbone.Model.extend({ idAttribute:"_id" });
        
        var get_model = function(uri, modeltype) {
            if (!(uri in modelsbyuri)) {
                modelsbyuri[uri] = modeltype ? new modeltype({_id:uri}) : new Model({_id:uri});
            }
            return modelsbyuri[uri];
        };
        var RDFQCollection =
            Backbone.Collection.extend({
                initialize:function(src_url) {
                    // console.log("loading from ", src_url);
                    this.src_url = src_url;
                },
                _convert_values : function(o) {
                    var this_ = this;
                    var convert_rdfv = function(v){
                        if (v === undefined) { return; }
                        return v.map(function(vv) {
                            if (vv.type === 'literal') { return vv.value; }
                            if (vv.type === 'uri' || vv.type == 'bnode') {
                                return get_model(vv.value, this_.model);
                            }
                            throw new Error("dont know how to handle ", vv);
                        });
                    };                            
                    var new_o = {};
                    _(o).map(function(v,k) { new_o[k] = convert_rdfv(v); });
                    return new_o;
                },                        
                fetch:function(options) {
                    var this_ = this;
                    var d = new $.Deferred();
                    fetch_by_proxy(this.src_url).then(function(xml) {
                        window.r = $(xml)
                        /* Preprocess - Fix all buggy dates */
                        var startTimes = Array.prototype.slice.call(xml.getElementsByTagNameNS("*", "start"));
                        var endTimes = Array.prototype.slice.call(xml.getElementsByTagNameNS("*", "end"));
                        var allTimes = [].concat(startTimes, endTimes);
                        _(allTimes).each(function (el) {
                            el.textContent = el.textContent.replace(/ ([0-9][0-9]:[0-9][0-9]:[0-9][0-9])/, 'T$1');
                        });                           
                        var dbload = $.rdf().load(xml, {});
                        var json = dbload.databank.dump();
                        var json_ms = _(json).keys().map(function(k) {
                            var m = get_model(k, this_.model);
                            _(m.attributes).chain()
                               .extend({_id:k})
                               .extend(this_._convert_values(json[k]));
                            return m;
                        });
                        this_.reset(json_ms);
                        d.resolve(this_);
                    }, function(err) {
                        console.error("Fetch failed with status " + err.status + ", check the proxy is running: $> ps -a | grep proxy");
                    });
                    return d;
                }
            });           
    return {
        RDFModel:Model,
        RDFCollection:RDFQCollection,
        get_rdf:function(rdfSource){return new RDFQCollection(rdfSource);}
    };
}