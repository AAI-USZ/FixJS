function(width, height, terrainWidth, showPreview) {
        var upperHeight = showPreview ? height * this.terrainPct : height;;
        var lowerHeight = height - upperHeight;
                
        this.axisDiv = document.createElement('div');
        this.axisDiv.style.position = 'absolute';
        this.axisDiv.style.top = '0px';
        this.axisDiv.style.left = '0px';
        this.axisDiv.style.height = upperHeight + 'px';
        this.axisDiv.style.width = this.axisWidth + 'px';        
        
        this.terrainContainerDiv = document.createElement('div');
        this.terrainContainerDiv.style.overflow = 'hidden';
        this.terrainContainerDiv.style.position = 'absolute';
        this.terrainContainerDiv.style.top = '0px';
        this.terrainContainerDiv.style.left = this.axisWidth + 'px';
        this.terrainContainerDiv.style.height = upperHeight + 'px';
        this.terrainContainerDiv.style.width = (width - this.axisWidth) + 'px';        
        
        this.terrainDiv = document.createElement('div');
        this.terrainDiv.style.position = 'absolute';
        this.terrainDiv.style.top = '0px';
        this.terrainDiv.style.left = '0px';
        this.terrainDiv.style.height = upperHeight + 'px';
        this.terrainDiv.style.width = terrainWidth + 'px';        

        if(showPreview) {
            this.previewDiv = document.createElement('div');
            this.previewDiv.style.position = 'absolute';
            this.previewDiv.style.top = upperHeight + 'px';
            this.previewDiv.style.left = '0px';
            this.previewDiv.style.height = lowerHeight + 'px';
            this.previewDiv.style.width = width + 'px';
        }

        this.mainContainerDiv = document.createElement('div');
        this.mainContainerDiv.appendChild(this.axisDiv);
        this.mainContainerDiv.appendChild(this.terrainContainerDiv);
        this.terrainContainerDiv.appendChild(this.terrainDiv);
        if(showPreview) this.mainContainerDiv.appendChild(this.previewDiv);

    }