function( direction ){
            // Calculate the handle scroll value
            var weight = this.options.scrollDistance * ( this.handle.parent()[ this.func[1] ]() - this.handle[ this.func[0] ]() ) / 
                ( this.element[ this.func[0] ]() - this.parent[ this.func[0] ]() ),
                diff = direction > 0 ? Math.ceil( direction * weight ) : Math.floor( direction * weight );
            
            // Move the scroll handle
            this.handle.draggable( "moveElement", this.dim, this.handle.position()[ this.dim ] + diff );
        }