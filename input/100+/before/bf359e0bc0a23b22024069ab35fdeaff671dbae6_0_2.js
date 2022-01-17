function(jqXHR) {
            // The responseText will relay the appropriate error message.
            var div = document.createElement('div');
            div.className = "queryResult";
            $(div).append("<div>" + corpus + "</div>");
            $(div).append("<div>" + model  + "</div>");
            $(div).append("<div>" + phrase + "</div>");

            $(div).append("<div class='alert alert-error'>"+jqXHR.responseText+"</div>");
            $(elt).append(div);

            // log error in dev console
            console.log('Error! jqXHR.responseText: ' + jqXHR.responseText)
          }