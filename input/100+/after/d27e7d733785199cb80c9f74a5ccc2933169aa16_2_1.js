function() {
      var input = this.element,
      key = this.options.key,
      escapeRegex = $.ui.autocomplete.escapeRegex;
      input.autocomplete({
	delay: 0,
	minLength: 0,
	source: function( request, response ) {
	  var matcher = new RegExp( escapeRegex(request.term), "i" ),
          options = ME.options[key] || [],
          l = options.length,
          filtered = [],
          text, i;
          
          if( !request.term ){
            filtered = options;
          } else {
            for(i = 0;i<l;i++){
              text = options[i];
              if ( matcher.test(text) ) {
                filtered.push( {
		  label: text.replace(
		    new RegExp(
		      "(?![^&;]+;)(?!<[^<>]*)(" +
			escapeRegex(request.term) +
			")(?![^<>]*>)(?![^&;]+;)", "gi"
		    ), "<strong>$1</strong>" ),
		  value: text
		});
              }
            }
          }
	  response( filtered );
	},
        focus: function(event, ui){
          input.val(ui.item.value).change();
        }
      })
	.addClass( "ui-corner-right short" );

      input.data( "autocomplete" )._renderItem = function( ul, item ) {
	return $( "<li></li>" )
	  .data( "item.autocomplete", item )
	  .append( "<a>" + item.label + "</a>" )
	  .appendTo( ul );
      };

      this.button = $( "<button type='button'>&nbsp;</button>" )
	.attr( "tabIndex", -1 )
	.attr( "title", "Show All Items" )
	.button({
	  icons: {
	    primary: "ui-icon-triangle-1-s"
	  },
	  text: false
	})
	.addClass( "ui-corner-right ui-button-icon" )
	.click(function() {
	  // close if already visible
	  if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
	    input.autocomplete( "close" );
	  } else {
	    // pass empty string as value to search for, displaying
            // all results
            if(input.data("hasPrompt")){
              input.val("");
            }
	    input.autocomplete( "search", "" );
	    input.focus();
          }
	})
	.appendTo( input.parent() );
    }