function(material, property, textureInfo, textureType) {
            var that = this;
            var path;
            var texture;
            if (textureType === 'sampler2D') {
                path = textureInfo;
                texture = this._pathsToTextures[path];
                if (typeof texture === 'undefined') {
                    texture = material._context.getDefaultTexture();
                    if (textureInfo !== 'agi_defaultTexture') {
                        this._pathsToMaterials[path] = this._pathsToMaterials[path] || [];
                        this._pathsToMaterials[path].push({'material' : material, 'property' : property});
                        if (this._pathsToMaterials[path].length === 1) {
                            Chain.run(
                                Jobs.downloadImage(path)
                            ).thenRun(function() {
                                texture = material._context.createTexture2D({source : this.images[path]});
                                that._updateMaterialsOnTextureLoad(texture, path);
                            });
                        }
                    }
                }
            }
            else if (textureType === 'samplerCube') {
                path = textureInfo.positiveX + textureInfo.negativeX +
                       textureInfo.positiveY + textureInfo.negativeY +
                       textureInfo.positiveZ + textureInfo.negativeZ;
                texture = this._pathsToTextures[path];
                if (typeof texture === 'undefined') {
                    texture = material._context.getDefaultCubeMap();
                    if (textureInfo !== 'agi_defaultCubeMap') {
                        this._pathsToMaterials[path] = this._pathsToMaterials[path] || [];
                        this._pathsToMaterials[path].push({'material' : material, 'property' : property});
                        if (this._pathsToMaterials[path].length === 1) {
                            Chain.run(
                                Jobs.downloadImage(textureInfo.positiveX),
                                Jobs.downloadImage(textureInfo.negativeX),
                                Jobs.downloadImage(textureInfo.positiveY),
                                Jobs.downloadImage(textureInfo.negativeY),
                                Jobs.downloadImage(textureInfo.positiveZ),
                                Jobs.downloadImage(textureInfo.negativeZ)
                            ).thenRun(function() {
                                texture = material._context.createCubeMap({
                                    source : {
                                        positiveX : this.images[textureInfo.positiveX],
                                        negativeX : this.images[textureInfo.negativeX],
                                        positiveY : this.images[textureInfo.positiveY],
                                        negativeY : this.images[textureInfo.negativeY],
                                        positiveZ : this.images[textureInfo.positiveZ],
                                        negativeZ : this.images[textureInfo.negativeZ]
                                    }
                                });
                                that._updateMaterialsOnTextureLoad(texture, path);
                            });
                        }
                    }
                }
            }
            return texture;
        }