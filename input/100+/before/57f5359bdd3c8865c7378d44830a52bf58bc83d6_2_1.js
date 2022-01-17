function(){
      //clear out the data list
      this.model.dataListView.renderNewModel();
      this.model.set("datumArray", []);
      var headers = [];
      $('th').each(function(index, item) {
          headers[index] = $(item).find(".drop-label-zone").val();
      });
      /*
       * Create new datum fields for new columns
       */
      for(f in headers){
        if (headers[f] == "" || headers[f] == undefined) {
          //do nothing
        } else if (headers[f] == "datumTags") {
          //do nothing
        } else{
          if(this.model.get("datumFields").where({label: headers[f]})[0] == undefined){
            this.model.get("datumFields").add(new DatumField({
              label : headers[f],
              encrypted: "checked",
              userchooseable: "",
              help: "This field came from file import "+this.model.get("status")
            }));
          }
        }
      }
      
      /*
       * Cycle through all the rows in table and create a datum with the matching fields.
       */
      var array = [];
      
      $('tr').has('td').each(function() {
          var arrayItem = {};
          $('td', $(this)).each(function(index, item) {
              arrayItem[headers[index]] = $(item).html();
          });
          array.push(arrayItem);
      });
      for (a in array) {
        var d = new Datum({corpusname : this.model.get("corpusname")});
        var fields = this.model.get("datumFields").clone();
        $.each(array[a], function(index, value) { 
          if(index == "" || index == undefined){
            //do nothing
          } else if (index == "datumTags") {
            var tags = value.split(" ");
            for(g in tags){
              var t = new DatumTag({
                "tag" : tags[g]
              });
              d.get("datumTags").add(t);
            }
          }else{
            var n = fields.where({label: index})[0];
            n.set("value", value);
          }
        });
        d.set("datumFields", fields);
        this.model.dataListView.addOneTempDatum(d);
        this.model.get("datumArray").push(d);
      }
      $(".approve-save").removeAttr("disabled");
      $(".approve-save").removeClass("disabled");
    }