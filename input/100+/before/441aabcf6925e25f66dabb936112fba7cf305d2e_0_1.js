function grantnotes(arText, footbar){
		
		// Prototype for the fNote object
		function fNote(ref, arText, fBar, note_count) {
			
			// Set construction actions and constructed variables
			this.number = note_count;
			this.refID =  'ref' + note_count;
			this.noteID = 'foot' + note_count;
			this.bar_offset = fBar.offset().top;

			// Make changes to the in-text <sup> elements
			var note_char;
			if(!ref.text()){
				note_char = this.number;
			} else {
				note_char = ref.text();
			};
			ref.prepend('<a href="#' + this.noteID + '">' + note_char + '</a>');


			// Find the footnote text and create a .footnote div
			fBar.append(jQuery('<div class="footnote" id="' + this.noteID + '"></div>'));
			this.element = jQuery('div#' + this.noteID + '.footnote'); // a jQuery object representing the newly created div.footnote
			this.element.append(jQuery('<sup>' + note_char + '</sup>'));
			this.element.append(arText.find('span.footnote-text').filter(':first'));

			// Now that the div.footnote exists, we can get its normal position, etc:
			this.normal_pos = this.element.position().top;

			// fNote methods
			this.getHeight = function(){ // returns the calculated height of the footnote div
				return this.element.outerHeight(true);
			};

			this.docPosition = function(){ // returns the position of the top of the element relative to the whole document
				return this.element.offset().top;
			};

			this.barPosition = function(){ // returns the position of the top of the element relative to the footnote-bar
				return this.element.position().top;
			};

			this.getBottom = function(){ // returns the position of the element bottom relative to the footnote-bar
				return (this.barPosition() + this.getHeight());
			};

			this.getAbsBottom = function(){ // returns the position of the element bottom relative to the whole page
				return (this.docPosition() + this.getHeight());
			};

			this.refPosition = function(){ // returns the position of the <sup> in arText transposed for the footnote-bar
				return ref.offset().top - this.bar_offset;
			};

			this.refAbsPosition = function(){ // returns the absolute position of the main text reference relative to whole document
				return ref.offset().top;
			};

			this.setPosition = function(num){ // sets the CSS: top value for the footnote element.
				this.element.css('top', num);
			};

			this.isSequential = function(){ // returns boolean of whether or not this reference used a number as its symbol
				return this.number == note_char;
			};
		};
		//prototype for the article object
		function article(arText) {
			this.offset = arText.offset().top;
			this.height = arText.height();
			this.absHeight = this.offset + this.height;
			this.element = arText;
		};
		// A generic transponsition function	
			//DO THIS LATER

		function bottomAdjust(footnote) {
			footnote.element.appendTo(article.element);
			footnote.element.css('position', 'static');
			footnote.element.css('width', '100%');
			footnote.element.css('border-top', '3px solid rgba(0, 0, 0, 0.3)');
			footnote.element.css('padding-top', '7px');
		};

			// Main
			var prev_bottom = 0;
			var note_count = 1;
			var noteArray = new Array(); // An array for storing the footnote objects
			//var arText = jQuery('article.main-article');
			var article = new article(arText); // create the article object

			// For each <sup> create a new fNote object
			arText.find('sup').each(function(){
				var ref = jQuery(this);
				//var fBar = jQuery('.footnote-bar');
				var footnote = new fNote(ref, arText, footbar, note_count);
				noteArray.push(footnote);
				jQuery('.footnote').css('visibility', 'visible');
				note_count = note_count + 1;
			});

			// Go through the noteArray and position the footnotes correctly
			for (var i = 0; i < noteArray.length; i++) {
				var footnote = noteArray[i];
				var ref_pos = footnote.refPosition();
				if(ref_pos < prev_bottom){
					footnote.setPosition(prev_bottom - footnote.normal_pos);
				} else {
					footnote.setPosition(ref_pos - footnote.normal_pos);
				};
				prev_bottom = footnote.getBottom();
				if((article.height - footnote.refPosition()) < footnote.getHeight()) {
					console.log('Overrun: true');
					bottomAdjust(footnote);
				};
			};
	}