function( basesPerSpan ) {
//        console.log('getting zoomed view for '+basesPerSpan);
        for( var i = this.zoomLevels.length - 1; i >= 0; i-- ) {
            var zh = this.zoomLevels[i];
            if( zh && ( zh.reductionLevel <= basesPerSpan || i == 0 ) ) {
                var indexLength = i < this.zoomLevels.length - 1
                    ? this.zoomLevels[i + 1].dataOffset - zh.indexOffset
                    : this.fileSize - 4 - zh.indexOffset;
//                console.log( 'using zoom level '+i);
                return new Window( this, zh.indexOffset, indexLength, i > 0 );
            }
        }
        return undefined;
    }