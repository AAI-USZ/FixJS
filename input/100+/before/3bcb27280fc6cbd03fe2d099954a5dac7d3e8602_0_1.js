function () {
        var i, key, value, arg, opacity, pair, properties = {};

        // normalize the user input
        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            if (JXG.isString(arg)) {
                // pairRaw is string of the form 'key:value'
                pair = arg.split(':');
                properties[JXG.trim(pair[0])] = JXG.trim(pair[1]);
            } else if (!JXG.isArray(arg)) {
                // pairRaw consists of objects of the form {key1:value1,key2:value2,...}
                JXG.extend(properties, arg);
            } else {
                // pairRaw consists of array [key,value]
                properties[arg[0]] = arg[1];
            }
        }

        // handle shortcuts
        properties = this.resolveShortcuts(properties);
        
        for (i in properties) {
            key = i.replace(/\s+/g, '').toLowerCase();
            value = properties[i];

            switch(key) {
                case 'name':
                    delete this.board.elementsByName[this.name];
                    this.name = value;
                    this.board.elementsByName[this.name] = this;
                    break;
                case 'needsregularupdate':
                    this.needsRegularUpdate = !(value == 'false' || value == false);
                    this.board.renderer.setBuffering(this, this.needsRegularUpdate ? 'auto' : 'static');
                    break;
                case 'labelcolor':
                    value = JXG.rgba2rgbo(value); 
                    opacity = value[1];
                    value = value[0];
                    if (opacity == 0) {
                        if (this.label!=null && this.hasLabel) {
                            this.label.content.hideElement();
                        }
                    }
                    if (this.label!=null && this.hasLabel) {
                        this.label.color = value;
                        this.board.renderer.setObjectStrokeColor(this.label.content, value, opacity);
                    }
                    if (this.type == JXG.OBJECT_TYPE_TEXT) {
                        this.visProp.strokecolor = value;
                        this.visProp.strokeopacity = opacity;
                        this.board.renderer.setObjectStrokeColor(this, this.visProp.strokecolor, this.visProp.strokeopacity);
                    }
                    break;
                case 'infoboxtext':
                    // TODO: what about functions? numbers? maybe text elements?
                    if (typeof(value) == 'string') {
                        this.infoboxText = value;
                    } else {
                        this.infoboxText = false;
                    }
                    break;
                case 'visible':
                    if (value == 'false' || value == false) {
                        this.visProp.visible = false;
                        this.hideElement();
                    } else if (value == 'true' || value == true) {
                        this.visProp.visible = true;
                        this.showElement();
                    }
                    break;
                case 'face':
                    if (this.elementClass == JXG.OBJECT_CLASS_POINT) {
                        this.visProp.face = value;
                        this.board.renderer.changePointStyle(this);
                    }
                    break;
                case 'trace':
                    if (value == 'false' || value == false) {
                        this.clearTrace();
                        this.visProp.trace = false;
                    } else {
                        this.visProp.trace = true;
                    }
                    break;
                case 'gradient':
                    this.visProp.gradient = value;
                    this.board.renderer.setGradient(this);
                    break;
                case 'gradientsecondcolor':
                    value = JXG.rgba2rgbo(value);
                    this.visProp.gradientsecondcolor = value[0];
                    this.visProp.gradientsecondopacity = value[1];
                    this.board.renderer.updateGradient(this);
                    break;
                case 'gradientsecondopacity':
                    this.visProp.gradientsecondopacity = value;
                    this.board.renderer.updateGradient(this);
                    break;
                case 'withlabel':
                    this.visProp.withlabel = value;
                    if (!value) {
                        if (this.label && this.label.content && this.hasLabel) {
                            this.label.content.hideElement();
                        }
                    } else {
                        if (this.label && this.label.content) {
                            if (this.visProp.visible) {
                                this.label.content.showElement();
                            }
                        } else {
                            this.createLabel();
                            if (!this.visProp.visible) {
                                this.label.content.hideElement();
                            }
                        }
                    }
                    this.hasLabel = value;
                    break;
                case 'rotate':
                    if ((this.type===JXG.OBJECT_TYPE_TEXT && this.visProp.display=='internal')
                        || this.type===JXG.OBJECT_TYPE_IMAGE) {
                        this.addRotation(value);
                    }
                    break;
                default:
                    if (JXG.exists(this.visProp[key]) && (!JXG.Validator[key] || (JXG.Validator[key] && JXG.Validator[key](value)) || (JXG.Validator[key] && JXG.isFunction(value) && JXG.Validator[key](value())))) {
                        value = value.toLowerCase && value.toLowerCase() === 'false' ? false : value;
                        this._set(key, value);
                    }
                    break;
            }
        }

        if (!this.visProp.needsRegularUpdate)
            this.board.fullUpdate();

        this.board.update(this);
        return this;
    }