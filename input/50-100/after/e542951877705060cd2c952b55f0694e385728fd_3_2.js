function() {
          //console.log('measureEditView.renderLists'); 

          $(this.el).find(this.containers.instrument_list)
            .empty()
            .append(this.instrumentList.render().el);
          
          $(this.el).find(this.containers.time_signature_list)
            .empty()
            .append(this.timeSignatureList.render().el);

          //$(this.el).find(this.containers.granularity_list)
          //  .empty()
          //  .append(GranularityList.render().el);            

        }