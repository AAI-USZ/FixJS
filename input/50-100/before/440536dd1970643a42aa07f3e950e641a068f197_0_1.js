function(){

            assertThat( this.panelWithDocument.getContentAreaElement(), equalTo( this.pageWrapperElement.getElements( '.' + this.panelWithDocument.options.contentAreaElementStyle )[0] ));

         }