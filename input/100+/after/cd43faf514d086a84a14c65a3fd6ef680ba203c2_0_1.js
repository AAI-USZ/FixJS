function() {
      utterance= this.model.get("datumFields").where({label: "utterance"})[0].get("value");
      gloss = this.model.get("datumFields").where({label: "gloss"})[0].get("value");
      translation= this.model.get("datumFields").where({label: "translation"})[0].get("value");
      
      $("#export-type-description").html(" as LaTeX (GB4E)");
      $("#export-text-area").val( $("#export-text-area").val()+
          "\n \\begin{exe} "
          + "\n \\ex [*] \\gll "+utterance+" \\\\"
          + "\n\t"+gloss+" \\\\"
          + "\n\t\\glt `"+ translation +"'"
          + "\n\\end{exe}\n\n"
               );
      $("#export-modal").modal("show");
    }