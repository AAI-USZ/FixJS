function () {
            var handleWrapSize,
                handleSize = 0;

            // Calculate the handle size
            if( this.parent[ this.func[0] ]() < this.element[ this.func[0] ]() ){
                handleSize = this.parent[ this.func[0] ]() * ( this.parent[ this.func[0] ]() / this.element[ this.func[0] ]() ); 
                handleSize = this.upBtn.is(':visible') ? handleSize - ( this.downBtn[ this.func[1] ]() + this.upBtn[ this.func[1] ]() ) : handleSize;
                handleSize = handleSize < this.minHandleSize ? this.minHandleSize : handleSize;
            }

            //Set the handle size and wrap size
            this.handle[ this.func[0] ]( handleSize );
            handleWrapSize = this.upBtn.is(':visible') ? this.parent[ this.func[0] ]() - ( 2 * this.upBtn[ this.func[1] ]() ) : this.parent[ this.func[0] ]();
            this.handle.parent()[  this.func[0]  ]( handleWrapSize );
        }