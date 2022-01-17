function(e) {
     e.preventDefault();

     var self = this;
     var newResource = new CKAN.Model.Resource({});

     this.el.find('input[name="add-resource-save"]').addClass("disabled");
     var urlVal = this.el.find('input[name="add-resource-url"]').val();
     var qaEnabled = $.inArray('qa',CKAN.plugins)>=0;

     if(qaEnabled && this.options.mode=='file') {
       $.ajax({
         url: CKAN.SITE_URL + '/qa/link_checker',
         context: newResource,
         data: {url: urlVal},
         dataType: 'json',
         error: function(){
           newResource.set({url: urlVal, resource_type: 'file'});
           self.collection.add(newResource);
           self.resetForm();
         },
         success: function(data){
           data = data[0];
           newResource.set({
             url: urlVal,
             resource_type: 'file',
             format: data.format,
             size: data.size,
             mimetype: data.mimetype,
             last_modified: data.last_modified,
             url_error: (data.url_errors || [""])[0]
           });
           self.collection.add(newResource);
           self.resetForm();
         }
       });
     }
     else {
       newResource.set({url: urlVal, resource_type: this.options.mode});
       this.collection.add(newResource);
       this.resetForm();
     }
  }