function(data){
          for(var i=0; i<data.length; i++){
            // Populate the format field (if it isn't "htm" or "html")
            var formatField = $(this[i]).find('input[id$="__format"]');
            var fmt = data[i].inner_format

            if($.trim(formatField.val()) == "" && !fmt.match(/^html?$/) ){
              formatField.val(data[i].inner_format);
            }

            // Indicate any url errors
            if(data[i].url_errors.length) {
              // If an empty url field, then only display error if there's at least one
              // other non-empty field in that row.
              var requiredFields = ["url", "description", "format", "date"];
              var showError = false;
              for(var j=0; j<requiredFields.length; j++){
                var field = $(this[i]).find('input[id$="__'+requiredFields[j]+'"]');
                showError = field.length >0 && $.trim(field.val()) !== '';
                if(showError){break;}
              }
              if(showError){
                $(this[i]).find('input[id$="__url"]').addClass('field_error').attr({'title': data[i].url_errors[0]});
              } else {
                $(this[i]).find('input[id$="__url"]').removeClass('field_error').removeAttr('title');
              }
            } else {
              $(this[i]).find('input[id$="__url"]').removeClass('field_error').removeAttr('title');
            }
          }
        }