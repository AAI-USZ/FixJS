function(material, property, texturePath, textureType) {
            var that = this;
            var path;
            var texture;
            if (textureType === 'sampler2D') {
                path = texturePath;
                texture = this._pathsToTextures[path];
                if (typeof texture === 'undefined') {
                    texture = material.context.getDefaultTexture();
                    this._pathsToMaterials[path] = this._pathsToMaterials[path] || [];
                    this._pathsToMaterials[path].push({'material' : material, 'property' : property});
                    if (this._pathsToMaterials[path].length === 1) {
                        Chain.run(
                            Jobs.downloadImage(texturePath)
                        ).thenRun(function() {
                            texture = material.context.createTexture2D({source : this.images[texturePath]});
                            that._updateMaterialsOnTextureLoad(texture, path);
                        });
                    }
                }
            }
            else if (textureType === 'samplerCube') {
                path = texturePath.positiveX + texturePath.negativeX +
                       texturePath.positiveY + texturePath.negativeY +
                       texturePath.positiveZ + texturePath.negativeZ;
                texture = this._pathsToTextures[path];
                if (typeof texture === 'undefined') {
                    texture = material.context.getDefaultCubeMap();
                    this._pathsToMaterials[path] = this._pathsToMaterials[path] || [];
                    this._pathsToMaterials[path].push({'material' : material, 'property' : property});
                    if (this._pathsToMaterials[path].length === 1) {
                        Chain.run(
                            Jobs.downloadImage(texturePath.positiveX),
                            Jobs.downloadImage(texturePath.negativeX),
                            Jobs.downloadImage(texturePath.positiveY),
                            Jobs.downloadImage(texturePath.negativeY),
                            Jobs.downloadImage(texturePath.positiveZ),
                            Jobs.downloadImage(texturePath.negativeZ)
                        ).thenRun(function() {
                            texture = material.context.createCubeMap({
                                source : {
                                    positiveX : this.images[texturePath.positiveX],
                                    negativeX : this.images[texturePath.negativeX],
                                    positiveY : this.images[texturePath.positiveY],
                                    negativeY : this.images[texturePath.negativeY],
                                    positiveZ : this.images[texturePath.positiveZ],
                                    negativeZ : this.images[texturePath.negativeZ]
                                }
                            });
                            that._updateMaterialsOnTextureLoad(texture, path);
                        });
                    }
                }
            }
            return texture;
        }