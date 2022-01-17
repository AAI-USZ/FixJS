function setAttrs(obj, c, level) {
                for(var key in c) {
                    var val = c[key];
                    var oldVal = obj[key];

                    /*
                     * only fire change event for root
                     * level attrs
                     */
                    if(level === 0) {
                        that._fireBeforeChangeEvent(key, oldVal, val);
                    }

                    // if obj doesn't have the val property, then create it
                    if(obj[key] === undefined && val !== undefined) {
                        obj[key] = {};
                    }

                    /*
                     * if property is a pure object (no methods), then add an empty object
                     * to the node and then traverse
                     */
                    if(type._isObject(val) && !type._isArray(val) && !type._isElement(val) && !type._hasMethods(val)) {
                        /*
                         * since some properties can be strings or objects, e.g.
                         * fill, we need to first check that obj is an object
                         * before setting properties.  If it's not an object,
                         * overwrite obj with an object literal
                         */
                        if(!Kinetic.Type._isObject(obj[key])) {
                            obj[key] = {};
                        }

                        setAttrs(obj[key], val, level + 1);
                    }
                    /*
                     * add all other object types to attrs object
                     */
                    else {
                        // handle special keys
                        switch (key) {
                            case 'rotationDeg':
                                that._setAttr(obj, 'rotation', c[key] * Math.PI / 180);
                                // override key for change event
                                key = 'rotation';
                                break;
                            /*
                             * includes:
                             * - node offset
                             * - fill pattern offset
                             * - shadow offset
                             */
                            case 'offset':
                                var pos = type._getXY(val);
                                that._setAttr(obj[key], 'x', pos.x);
                                that._setAttr(obj[key], 'y', pos.y);
                                break;
                            case 'scale':
                                var pos = type._getXY(val);
                                that._setAttr(obj[key], 'x', pos.x);
                                that._setAttr(obj[key], 'y', pos.y);
                                break;
                            case 'points':
                                that._setAttr(obj, key, type._getPoints(val));
                                break;
                            case 'crop':
                                var pos = type._getXY(val);
                                var size = type._getSize(val);
                                that._setAttr(obj[key], 'x', pos.x);
                                that._setAttr(obj[key], 'y', pos.y);
                                that._setAttr(obj[key], 'width', size.width);
                                that._setAttr(obj[key], 'height', size.height);
                                break;
                            case 'image':
                                var img = type._getImage(val);
                                that._setAttr(obj, key, img);
                                break;
                            default:
                                that._setAttr(obj, key, val);
                                break;
                        }
                    }
                    /*
                     * only fire change event for root
                     * level attrs
                     */
                    if(level === 0) {
                        that._fireChangeEvent(key, oldVal, val);
                    }
                }
            }