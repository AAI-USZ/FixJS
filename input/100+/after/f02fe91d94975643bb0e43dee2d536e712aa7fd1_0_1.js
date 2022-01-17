function(el) {
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
                $(link).update(["<span class='", css_class, "'>", label, "</span>", $(link).innerHTML].join(''))
              }
            }
          }
        );
      }
    }