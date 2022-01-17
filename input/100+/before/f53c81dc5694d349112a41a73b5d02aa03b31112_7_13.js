function(){
        var $this = $(this),
            col = Math.floor( props.index / props.rows ),
            row = props.index % props.rows,
            x = Math.round( ( col + 0.5 ) * props.columnWidth - $this.outerWidth(true) / 2 ),
            y = Math.round( ( row + 0.5 ) * props.rowHeight - $this.outerHeight(true) / 2 );
        instance._pushPosition( $this, x, y );
        props.index ++;
      }