function() {

      this.testCaseChain.chain(

         function(){ this.constructPanel( this.panelWithDocument ); }.bind( this ),

         function(){

            assertThat( this.panelWithDocument.getContentAreaElement(), equalTo( this.pageWrapperElement.getElements( '.' + this.panelWithDocument.options.contentAreaElementStyle )[0] ));

         }.bind( this ),

         function(){

            this.testMethodReady();

         }.bind( this )

      ).callChain();

   }