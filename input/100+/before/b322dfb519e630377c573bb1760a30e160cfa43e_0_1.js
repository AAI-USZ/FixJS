function(){
	
	var Setters = {
		
		inputTypes : {

			checkbox : function( box, value ) {
				if (value === true || value === "true") {
					box.checked = true;
				}
			}

		},

		input : function ( box, value ) {

			if (this.inputTypes[box.type]) {
				return this.inputTypes[box.type]( box, value );
			}

		},
		
		select : function(  ) {
			
		}

	}
	
	var Getters = {
		
		inputTypes : {

			checkbox : function( box ) {
				return box.checked;
			}

		},

		input : function ( box ) {

			if (this.inputTypes[box.type]) {
				return this.inputTypes[box.type]( box );
			}

		},
		
		select : function(  ) {
			
		}

	}
	
	var Visualisers = {
		
		inputTypes : {

			checkbox : function( box ) {
				document.body.className = document.body.className.replace( new RegExp(" ?" + box.id.replace(/\W/, ".") ), "" );
				if (box.checked) {

					document.body.className += " " + box.id;

				}
			}

		},

		input : function ( box ) {

			if (this.inputTypes[box.type]) {
				return this.inputTypes[box.type]( box );
			}

		},
		
		select : function(  ) {
			
		}

	}

	Events.attach(window, "load", function() {

		var form = document.getElementById("debugOptionsForm");

		if (form) {

			for (var i = 0; i < form.elements.length; i++) {

				var option = form.elements[i];
				var storedValue = Settings.getPreference(option.id);

				var tn = option.tagName.toLowerCase();
				
				if (Setters[tn]) {

					Setters[tn]( option, storedValue );

				}
				
				if (Visualisers[tn]) {

					Visualisers[tn]( option );

				}

			}

		}
	
		Events.attach(form, "change", function (e) {
			var t = e.target;

			var tn = t.tagName.toLowerCase();
			
			Console.log( tn );
			
			if (Getters[tn]) {

				var value = Getters[tn]( t );
				Console.log( value );
				Settings.setPreference( t.id, value );

			}
				
			if (Visualisers[tn]) {

				Visualisers[tn]( t );

			}

		});

	});

}