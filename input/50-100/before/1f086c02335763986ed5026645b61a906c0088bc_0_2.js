function(a,b) {
        var pos1 = this.getPositions( a.change ),
            pos2 = this.getPositions( b.defaults );

		return this.comparePositions( pos1[0], pos2[0] ) && this.comparePositions( pos1[1], pos2[1] );
    }