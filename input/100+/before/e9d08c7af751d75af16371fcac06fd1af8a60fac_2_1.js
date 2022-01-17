function (url, wrap, mips) {
        var texture = this.ctx.createTexture();
        this.unloadedTextureCount++;

        if (wrap === undefined)
            wrap = "CLAMP";
        if (mips === undefined)
            mips = true;

        if (texture) {
            texture.image = new Image();
            texture.image.src = url;
            texture.image.context = RDGE.globals.engine.getContext();
            texture.texparams = new _texparams(wrap, mips);
            texture.image.onload = function () {
                var stateMan = this.context.ctxStateManager;
                stateMan.RDGEInitState.loadTexture(texture);
                this.context.renderer.unloadedTextureCount--;
                //console.log( "loaded texture: " + texture.lookUpName + ",to: " + this.context.renderer._world._worldCount + ", textures remaining to load: " + this.context.renderer.unloadedTextureCount );
                if (texture.callback) texture.callback(texture);
                if (this.context.renderer.unloadedTextureCount < 0)
                    console.log("more textures loaded then created...");
            };
            texture.image.onerror = function () {
                this.context.renderer.unloadedTextureCount--;
                if (texture.callback) texture.callback(texture);
                //console.log( "Error loading texture: " + texture.image.src );
                if (this.context.renderer.unloadedTextureCount < 0)
                    console.log("more textures loaded then created...");
            };
        }
        return texture;
    }