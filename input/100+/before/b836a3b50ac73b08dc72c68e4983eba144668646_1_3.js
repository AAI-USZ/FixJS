function(){
            // Calculate the element position
            var val = - this.handle.position()[this.dim] * ( this.element[ this.func[1] ](true) - this.parent[ this.func[0] ]() ) / 
                ( this.handle.parent()[ this.func[0] ]() - this.handle[ this.func[0] ]() );

            // Move the content by the specified scroll distance
            if( val <= 0 && Math.abs( val ) + this.parent[ this.func[0] ]() < this.element[ this.func[0] ]() ){
                this.element.css( this.dim, val + 'px' );
            } else if( 0 < val ) {
                this.element.css( this.dim, '0px' );
            } else {
                this.element.css( this.dim, - ( this.element[ this.func[1] ](true) - this.parent[ this.func[0] ]() ) + 'px' );
            }
        }