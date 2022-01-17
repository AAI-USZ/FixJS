function( basesPerSpan ) {
        //console.log('getting view for '+basesPerSpan+' bases per span');
        for( var i = this.zoomLevels.length - 1; i > 0; i-- ) {
            var zh = this.zoomLevels[i];
            if( zh && zh.reductionLevel <= basesPerSpan ) {
                var indexLength = i < this.zoomLevels.length - 1
                    ? this.zoomLevels[i + 1].dataOffset - zh.indexOffset
                    : this.fileSize - 4 - zh.indexOffset;
                //console.log( 'using zoom level '+i);
                return new Window( this, zh.indexOffset, indexLength, true );
            }
        }
        //console.log( 'using unzoomed level');
        return this.getUnzoomedView();
    }