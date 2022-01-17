function () {
                this.context.renderer.unloadedTextureCount--;
                if (texture.callback) texture.callback(texture);
                console.log( "Error loading texture: " + texture.image.src );
                if (this.context.renderer.unloadedTextureCount < 0)
                    console.log("more textures loaded then created...");
            }