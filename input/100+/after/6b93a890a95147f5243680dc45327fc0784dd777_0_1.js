function() {
    //Check all by one requets
    // if($$('tr.issue td.subject') != undefined){
    //       var project_id = $("issue_change_project_id").getValue();
    //       var issue_ids = $$('tr.issue').collect(function(el){ return "issue_ids[]=" + $(el).id.replace(/[^0-9]/g, ''); }).join(";")
    //       if(issue_ids.length > 0){
    //         new Ajax.Request("/issue_changes/check_all.js", 
    //           { asynchronous:true, 
    //             method: 'post',
    //             parameters: "project_id=" + project_id + ";" + issue_ids
    //           }
    //         );
    //       }
    //     }
    
    // For separate request per each issue
    $$('tr.issue td.subject').each(function(el) {
      var issue_id = $(el).up('tr.issue').id.replace(/[^0-9]/g, '')
      if(issue_id != null && issue_id.length > 0){
        new Ajax.Request("/issue_changes/check.json", 
          { asynchronous:true, 
            method: 'get',
            parameters: {issue_id: issue_id},
            evalJSON: true,
            onSuccess:  function(response) {
              var label = response.responseJSON['label'];
              var css_class = response.responseJSON['css_class'];
              if((label != null || label != undefined) && label.length > 0){
                var link = $(el).down('a')
                $(link).update(["<span class='", css_class, "'>", label, "</span>&nbsp;", $(link).innerHTML].join(''))
              }
            }
          }
        );
      }
    });
  }