function Material(description) {
        var that = this;
        this.description = description || {};
        this.context = this.description.context;
        this.strict = (typeof this.description.strict !== 'undefined') ? this.description.strict : false;
        this.template = this.description.template || {};
        this._materialRedefinition = (typeof this.template.redefine !== 'undefined') ? (this.template.redefine === 'true') : false;
        this._materialID = this.template.id;

        // If the factory contains this material ID, build the material template off of the stored template.
        var isOldMaterialType = this._materialFactory.hasMaterial(this._materialID) && (this._materialRedefinition === false);
        if (isOldMaterialType) {
            var newMaterialTemplate = clone(this._materialFactory.getMaterial(this._materialID));
            this._extendObject(this.template, newMaterialTemplate);
        }

        // Once the template has been established, set the member variables.
        this._materialUniforms = this.template.uniforms || {};
        this._materialTemplates = this.template.materials || {};
        this._materialComponents = this.template.components;
        this._materialSource = this.template.source;
        this._materialSourcePath = this.template.sourcePath;
        this._hasComponentSection = (typeof this._materialComponents !== 'undefined');
        this._hasSourceSection = (typeof this._materialSource !== 'undefined');
        this._hasSourcePathSection = (typeof this._materialSourcePath !== 'undefined');

        // Make sure the template has no obvious errors. More error checking happens later.
        this._checkForErrors();

        // If the material has a new ID, add it to the factory.
        var isNewMaterialType = (typeof this._materialID !== 'undefined') && (isOldMaterialType === false);
        if (isNewMaterialType){
            this._materialFactory.addMaterial(this._materialID, this.template);
        }

        // Build the shader source for the main material.
        this._shaderSource = '';
        if (this._hasSourceSection) {
            this._shaderSource += this._materialSource;
        }
        else if (this._hasSourcePathSection) {
            this._shaderSource += this._materialFactory.getShaderSource(this._materialSourcePath);
        }
        else {
            this._shaderSource += 'agi_material agi_getMaterial(agi_materialInput materialInput)\n{\n';
            this._shaderSource += 'agi_material material = agi_getDefaultMaterial(materialInput);\n';
            this._shaderSource += 'return material;\n}\n';
        }
        if (this._hasComponentSection) {
            for (var component in this._materialComponents) {
                if (this._materialComponents.hasOwnProperty(component)) {
                    var expression = this._materialComponents[component];
                    if (expression.length > 0) {
                        var statement = 'material.' + component + ' = ' + expression + ';\n';
                        var indexOfReturn = this._shaderSource.indexOf('return material;');
                        var firstHalf = this._shaderSource.slice(0, indexOfReturn);
                        var secondHalf = this._shaderSource.slice(indexOfReturn, this._shaderSource.length);
                        this._shaderSource = firstHalf + statement + secondHalf;
                    }
                }
            }
        }

        // Set up uniforms for the main material
        this._uniforms = {};
        var newShaderSource = '';
        var returnUniform = function (uniformID) {
            return function() {
                return that[uniformID];
            };
        };
        for (var uniformID in this._materialUniforms) {
            if (this._materialUniforms.hasOwnProperty(uniformID)) {
                var uniformValue = this._materialUniforms[uniformID];
                uniformValue = this._materialUniforms[uniformValue] || uniformValue;
                var uniformType = this._getUniformType(uniformValue);
                if (typeof uniformType === 'undefined') {
                    throw new DeveloperError('Invalid uniform type for \'' + uniformID + '\'.');
                }
                // When the uniform type is a string, replace all tokens with its value.
                if (uniformType === 'string') {
                    this._replaceToken(uniformID, uniformValue, false);
                }
                else {
                    this[uniformID] = uniformValue;
                    var newUniformID = uniformID + '_' + this._getNewGUID();
                    this._uniforms[newUniformID] = returnUniform(uniformID);

                    // Add uniform declaration to source code.
                    var uniformPhrase = 'uniform ' + uniformType + ' ' + uniformID + ';\n';
                    if (this._shaderSource.indexOf(uniformPhrase) === -1) {
                        newShaderSource += uniformPhrase.replace(uniformID, newUniformID);
                    }

                    // Replace uniform name with guid version.
                    this._replaceToken(uniformID, newUniformID, true);

                    // If uniform is a texture, load it.
                    if (uniformType === 'sampler2D' || uniformType === 'samplerCube') {
                        this[uniformID] = this._texturePool.registerTextureToMaterial(this, uniformID, uniformValue, uniformType);
                    }
                }
            }
        }
        this._shaderSource = newShaderSource + this._shaderSource;

        // Create all sub-materials and combine source and uniforms together.
        newShaderSource = '';
        for (var materialID in this._materialTemplates) {
            if (this._materialTemplates.hasOwnProperty(materialID)) {
                // Construct the sub-material. Share texture names using extendObject.
                var materialTemplate = this._materialTemplates[materialID];
                materialTemplate.uniforms = materialTemplate.uniforms || {};
                this._extendObject(materialTemplate.uniforms, this._materialUniforms);
                var material = new Material({'context' : this.context, 'strict' : this.strict, 'template' : materialTemplate});
                this[materialID] = material;

                // Make the material's agi_getMaterial unique by appending a guid.
                var originalMethodName = 'agi_getMaterial';
                var newMethodName = originalMethodName + '_' + this._getNewGUID();
                material._replaceToken(originalMethodName, newMethodName, true);

                // Replace each material id with an agi_getMaterial method call.
                // Example: material.diffuse = diffuseMap.diffuse
                // Becomes: material.diffuse = agi_getMaterial_{guid}(materialInput).diffuse
                var newMethodCall = newMethodName + '(materialInput)';
                if (this._replaceToken(materialID, newMethodCall, true) === 0 && this.strict) {
                    throw new DeveloperError('Shader source does not use material \'' + materialID + '\'.');
                }
                this._extendObject(this._uniforms, material._uniforms);
                newShaderSource += '\n' + material._shaderSource;
            }
        }
        this._shaderSource = newShaderSource + this._shaderSource;
    }