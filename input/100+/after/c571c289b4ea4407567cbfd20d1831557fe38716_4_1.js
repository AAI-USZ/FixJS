function(rdfc) {
           // turn our thing into a codemirror
           var views = [];           
           var update_values=function(f) {
               views.map(function(v) {
                   var val = undefined;
                   if (f) {
                       try { val = f(v.options.model.toJSON()); } catch(x) { console.error(x); }
                   }
                   v.valueview.find('textarea').val(val !== undefined ? val.toString() : "~");
               });
           };
           var compile_function = function(txt) {
               try {
                   var f = eval(txt);
                   console.log(f);
                   return f;
               } catch(E) {
                   return undefined;
               }
           }
           var refresh = function() {
               var txt = vfneditor.getValue();
               update_values(compile_function(txt));
           };
           var vfneditor = CodeMirror.fromTextArea($('textarea')[0], {
               onChange:refresh
           });
           var ThingView = Backbone.View.extend({
               template:_($('#thing_template').html()).template(),
               tagName:"td",
               className:"thing",
               initialize:function() {
                   this.$el.data("model", this.options.model);
                   this.$el.data("view", this.options.model);                   
               },
               render:function() {
                   console.log(this.options.model.toJSON());
                   this.$el.html(this.template({m:this.options.model.toJSON()}));
                   return this.el;
               }
           });
           var c = rdfc.get_rdf('http://data.southampton.ac.uk/building/58.rdf');
           c.fetch().then(function() {
               views = views.concat(c.map(function(m) {
                   var v = new ThingView({model:m});
                   var row = $('<tr></tr>').appendTo('#values');
                   var cell = row.append(v.render());
                   v.valueview = $('<td class="val"><textarea></textarea></td>').appendTo(row);
                   return v;
               }));
               refresh();
               console.log(" omg data ", data);
           });           
           return {};
       }