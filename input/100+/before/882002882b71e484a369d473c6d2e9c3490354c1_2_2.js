function() {
        // Make sure source and sourcePath do not exist in the same template.
        if (this._hasSourceSection && this._hasSourcePathSection) {
            throw new DeveloperError('Cannot have source and sourcePath in the same template.');
        }

        // Make sure there are no duplicate names
        var duplicateNames = {};
        var groups = {'uniforms' : this._materialUniforms, 'materials' : this._materialTemplates};
        for (var groupID in groups) {
            if (groups.hasOwnProperty(groupID)) {
                var groupValue = groups[groupID];
                if (typeof groupValue !== 'undefined') {
                    for (var id in groupValue) {
                        if (groupValue.hasOwnProperty(id)) {
                            var existingGroupID = duplicateNames[id];
                            if (typeof existingGroupID !== 'undefined') {
                                throw new DeveloperError('Duplicate identifier \'' + id + '\' found in \'' + groupID + '\' and \'' + existingGroupID + '\'.');
                            }
                            duplicateNames[id] = groupID;
                        }
                    }
                }
            }
        }

        //Make sure all the component types are valid
        duplicateNames = {};
        if (this._hasComponentSection) {
            var validComponentTypes = ['diffuse', 'specular', 'normal', 'emission', 'alpha'];
            for (var component in this._materialComponents) {
                if (this._materialComponents.hasOwnProperty(component)) {
                    var validComponent = false;
                    for (var i = 0; i < validComponentTypes.length; i++) {
                        if (validComponentTypes[i] === component) {
                            if (typeof duplicateNames[component] !== 'undefined') {
                                throw new DeveloperError('Duplicate component name \'' + component + '\'.');
                            }
                            duplicateNames[component] = true;
                            validComponent = true;
                            break;
                        }
                    }
                    if (validComponent === false) {
                        throw new DeveloperError('Component name \'' + component + '\' does not exist.');
                    }
                }
            }
        }
    }