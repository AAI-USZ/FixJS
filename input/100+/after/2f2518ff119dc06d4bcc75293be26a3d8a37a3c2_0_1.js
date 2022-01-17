function(element, props, usedProps, inheritMode)
    {
        // Element can contain an invalid name (see issue 5303)
        try
        {
            var dummyElement = element.ownerDocument.createElementNS(
                element.namespaceURI, element.tagName);
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("css.markOverriddenProps:", err);
            return;
        }

        for (var i=0; i<props.length; i++)
        {
            var prop = props[i];

            // Helper array for all shorthand properties for the current property.
            prop.computed = {};

            // Get all shorthand propertis.
            var dummyStyle = dummyElement.style;

            // xxxHonza: Not sure why this happens.
            if (!dummyStyle)
            {
                if (FBTrace.DBG_ERRORS)
                    FBTrace.sysout("css.markOverridenProps; ERROR dummyStyle is NULL");
                return;
            }

            dummyStyle.cssText = "";
            dummyStyle.setProperty(prop.name, prop.value, prop.important);

            var length = dummyStyle.length;
            for (var k=0; k<length; k++)
            {
                var name = dummyStyle.item(k);

                prop.computed[name] = {
                    overridden: false
                };

                if (usedProps.hasOwnProperty(name))
                {
                    var deadProps = usedProps[name];

                    // all previous occurrences of this property
                    for (var j=0; j<deadProps.length; j++)
                    {
                        var deadProp = deadProps[j];

                        // xxxHonza: fix for issue 3009, cross out even inherited properties
                        //if (deadProp.wasInherited)
                        //    continue;

                        if (!deadProp.disabled && deadProp.important && !prop.important)
                        {
                            // new occurrence overridden
                            prop.overridden = true;

                            // Remember what exact shorthand property has been overridden.
                            // This should help when we want to cross out only specific
                            // part of the property value.
                            if (prop.computed.hasOwnProperty(name))
                                prop.computed[name].overridden = true;
                        }
                        else if (!prop.disabled)
                        {
                            // previous occurrences overridden
                            deadProp.overridden = true;

                            if (deadProp.computed.hasOwnProperty(name))
                                deadProp.computed[name].overridden = true;
                        }
                    }
                }
                else
                {
                    usedProps[name] = [];
                }

                // all occurrences of a property seen so far, by name
                usedProps[name].push(prop);
            }

            prop.wasInherited = inheritMode ? true : false;
        }
    }