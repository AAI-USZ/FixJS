function Material(description) {
        this._description = description || {};
        this._context = this._description.context;
        if (typeof this._context === 'undefined') {
            throw new DeveloperError('context is required.');
        }
        this._strict = (typeof this._description.strict !== 'undefined') ? this._description.strict : false;
        this._template = this._description.template || {};
        this._materialID = this._template.id;

        // If the factory contains this material ID, build the material template off of the stored template.
        var isOldMaterialType = this._materialFactory.hasMaterial(this._materialID);
        if (isOldMaterialType) {
            var newMaterialTemplate = clone(this._materialFactory.getMaterial(this._materialID));
            this._extendObject(this._template, newMaterialTemplate);
        }

        // Once the template has been established, set the member variables.
        this._materialUniforms = this._template.uniforms || {};
        this._materialTemplates = this._template.materials || {};
        this._materialComponents = this._template.components;
        this._materialSource = this._template.source;
        this._hasComponentsSection = (typeof this._materialComponents !== 'undefined');
        this._hasSourceSection = (typeof this._materialSource !== 'undefined');

        // Make sure the template has no obvious errors. More error checking happens later.
        this._checkForTemplateErrors();

        // If the material has a new ID, add it to the factory.
        var isNewMaterialType = (isOldMaterialType === false) && (typeof this._materialID !== 'undefined');
        if (isNewMaterialType){
            this._materialFactory.addMaterial(this._materialID, this._template);
        }

        // Build the shader source for the main material.
        this._shaderSource = '';
        if (this._hasSourceSection) {
            this._shaderSource += this._materialSource;
        }
        else {
            this._shaderSource += 'agi_material agi_getMaterial(agi_materialInput materialInput)\n{\n';
            this._shaderSource += 'agi_material material = agi_getDefaultMaterial(materialInput);\n';
            if (this._hasComponentsSection) {
                for (var component in this._materialComponents) {
                    if (this._materialComponents.hasOwnProperty(component)) {
                        var expression = this._materialComponents[component];
                        var statement = 'material.' + component + ' = ' + expression + ';\n';
                        this._shaderSource += statement;
                    }
                }
            }
            this._shaderSource += 'return material;\n}\n';
        }

        // Set up uniforms for the main material
        this.uniforms = {};
        this._uniforms = {};
        var returnUniform = function (material, uniformID) {
            return function() {
                return material.uniforms[uniformID];
            };
        };
        for (var uniformID in this._materialUniforms) {
            if (this._materialUniforms.hasOwnProperty(uniformID)) {
                var uniformValue = this._materialUniforms[uniformID];
                var uniformType = this._getUniformType(uniformValue);
                if (typeof uniformType === 'undefined') {
                    throw new DeveloperError('Invalid uniform type for uniform \'' + uniformID + '\'.');
                }
                // When the uniform type is a string, replace all tokens with its value.
                if (uniformType === 'string') {
                    if (this._replaceToken(uniformID, uniformValue, false) === 0 && this._strict) {
                        throw new DeveloperError('Shader source does not use string \'' + uniformID + '\'.');
                    }
                }
                else {
                    // Add uniform declaration to source code.
                    var uniformPhrase = 'uniform ' + uniformType + ' ' + uniformID + ';\n';
                    if (this._shaderSource.indexOf(uniformPhrase) === -1) {
                        this._shaderSource = uniformPhrase + this._shaderSource;
                    }
                    // Replace uniform name with guid version.
                    var newUniformID = uniformID + '_' + this._getNewGUID();
                    if (this._replaceToken(uniformID, newUniformID, true) === 1 && this._strict) {
                        throw new DeveloperError('Shader source does not use uniform \'' + uniformID + '\'.');
                    }
                    // If uniform is a texture, load it.
                    if (uniformType.indexOf('sampler') !== -1) {
                        uniformValue = this._texturePool.registerTextureToMaterial(this, uniformID, uniformValue, uniformType);
                    }
                    // If the uniform is a matrix, create the correct matrix type from the array.
                    else if (uniformType.indexOf('mat') !== -1) {
                        var dimension = uniformType.slice(uniformType.length - 1);
                        if (dimension === '2') {
                            uniformValue = new Matrix2(uniformValue[0], uniformValue[1],
                                                       uniformValue[2], uniformValue[3]);
                        }
                        else if (dimension === '3') {
                            uniformValue = new Matrix3(uniformValue[0], uniformValue[1], uniformValue[2],
                                                       uniformValue[3], uniformValue[4], uniformValue[5],
                                                       uniformValue[6], uniformValue[7], uniformValue[8]);
                        }
                        else if (dimension === '4') {
                            uniformValue = new Matrix4(uniformValue[0], uniformValue[1], uniformValue[2], uniformValue[3],
                                                       uniformValue[4], uniformValue[5], uniformValue[6], uniformValue[7],
                                                       uniformValue[8], uniformValue[9], uniformValue[10], uniformValue[11],
                                                       uniformValue[12], uniformValue[13], uniformValue[14], uniformValue[15]);
                        }
                    }
                    // Set uniform value
                    this.uniforms[uniformID] = uniformValue;
                    this._uniforms[newUniformID] = returnUniform(this, uniformID);
                }
            }
        }
        // Create all sub-materials and combine source and uniforms together.
        var newShaderSource = '';
        this.materials = {};
        for (var materialID in this._materialTemplates) {
            if (this._materialTemplates.hasOwnProperty(materialID)) {
                // Construct the sub-material. Share texture names using extendObject.
                var materialTemplate = this._materialTemplates[materialID];
                var material = new Material({'context' : this._context, 'strict' : this._strict, 'template' : materialTemplate});
                this._extendObject(this._uniforms, material._uniforms);
                this.materials[materialID] = material;

                // Make the material's agi_getMaterial unique by appending a guid.
                var originalMethodName = 'agi_getMaterial';
                var newMethodName = originalMethodName + '_' + this._getNewGUID();
                material._replaceToken(originalMethodName, newMethodName, true);
                newShaderSource += material._shaderSource + '\n';

                // Replace each material id with an agi_getMaterial method call.
                var materialMethodCall = newMethodName + '(materialInput)';
                if (this._replaceToken(materialID, materialMethodCall, true) === 0 && this._strict) {
                    throw new DeveloperError('Shader source does not use material \'' + materialID + '\'.');
                }
            }
        }
        this._shaderSource = newShaderSource + this._shaderSource;
    }