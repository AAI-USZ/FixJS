function () {
       var that = this;

	   if ( typeof this.settings.numeratedactive !== 'undefined' ) {
			this.numeratedactive = this.settings.numeratedactive;
		}

	   // modifyable selector for the headers, that should be numerated
	   if ( typeof this.settings.headingselector !== 'undefined' ) {
			this.headingselector = this.settings.headingselector;
		}
	   // modifyable selector for the baseobject. Where should be numerated
	   if ( typeof this.settings.baseobjectSelector !== 'undefined' ) {
			this.baseobjectSelector = this.settings.baseobjectSelector;
		}
		
       	    // add button to toggle format-less pasting
          this.numeratedHeadersButton = new Aloha.ui.Button({
            'iconClass' : 'aloha-button aloha-button-numerated-headers',
            'size' : 'small',
            'onclick' : function () {
		   if(that.numeratedHeadersButton.isPressed()) {
			//that.numeratedHeadersButton.setPressed(false);
			that.removeNumerations();
		   }
		   else {
			//that.numeratedHeadersButton.setPressed(true);
			that.createNumeratedHeaders();
		   }
            },
            'tooltip' : i18n.t('button.numeratedHeaders.tooltip'),
            'toggle' : true,
	    'pressed' : this.numeratedactive
          });

          FloatingMenu.addButton(
            'Aloha.continuoustext',
            this.numeratedHeadersButton,
            i18nCore.t('floatingmenu.tab.format'),
            1
          );
	   
	  // We need to bind to selection-changed event to recognize backspace and delete interactions
	  Aloha.bind( 'aloha-selection-changed', function ( event ) {
	    if ( that.numeratedHeadersButton.isPressed() ) {
		that.createNumeratedHeaders();
	    }
	  });
     }