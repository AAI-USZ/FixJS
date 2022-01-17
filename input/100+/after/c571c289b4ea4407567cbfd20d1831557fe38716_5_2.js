function() {
           var fetch_by_proxy = function(url,proxy_url) {
               proxy_url = proxy_url || "http://"+ document.location.host + ":9292";
               return $.get(proxy_url, { url : url });
           };
           var modelsbyuri = {};
           var Model = Backbone.Model.extend({ idAttribute:"_id" });           
           var get_model = function(uri) {
               if (!(uri in modelsbyuri)) {
                   modelsbyuri[uri] = new Model({_id:uri});
               }
               return modelsbyuri[uri];
           };
           var _convert_helper=function(v) {
               if (v.type === 'literal') { return v.value; }
               if (v.type === 'uri' || v.type == 'bnode') { return get_model(v.value); }
               throw new Error("dont know how to handle ", v);
           }           
           var convert_rdfv = function(v){
               if (v === undefined) { return; }
               if (v.length === 0) { return []; }
               if (v.length == 1) {  return _convert_helper(v[0]);       }
               return v.map(_convert_helper);
           };
           var convert_values = function(o) {
               var new_o = {};
               _(o).map(function(v,k) { new_o[k] = convert_rdfv(v); });
               return new_o;
           };
           var RDFQCollection =
               Backbone.Collection.extend({
                   initialize:function(src_url) {
                       // console.log("loading from ", src_url);
                       this.src_url = src_url;
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
                           window._DEBUG_DB = dbload; // TODO eliminate
                           var json = dbload.databank.dump();
                           var json_ms = _(json).keys().map(function(k) {
                               var m = get_model(k);
                               _(m.attributes).extend(_(convert_values(json[k])).extend({_id:k}));
                               return m;
                           });                           
                           this_.reset(json_ms);
                           d.resolve(this_);
                       });
                       return d;
                   }
               });           
           return {
               get_model:get_model,
               get_rdf:function(rdfSource){return new RDFQCollection(rdfSource);}
           };
       }