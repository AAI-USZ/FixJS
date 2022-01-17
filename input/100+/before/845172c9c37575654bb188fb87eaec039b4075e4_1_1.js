function()
    {
        var value = this.value;

        this.updateState();

        var enabledCheckboxElement;
        if (this.parsedOk) {
            enabledCheckboxElement = document.createElement("input");
            enabledCheckboxElement.className = "enabled-button";
            enabledCheckboxElement.type = "checkbox";
            enabledCheckboxElement.checked = !this.disabled;
            enabledCheckboxElement.addEventListener("change", this.toggleEnabled.bind(this), false);
        }

        var nameElement = document.createElement("span");
        nameElement.className = "webkit-css-property";
        nameElement.textContent = this.name;
        nameElement.title = this.property.propertyText;
        this.nameElement = nameElement;

        this._expandElement = document.createElement("span");
        this._expandElement.className = "expand-element";

        var valueElement = document.createElement("span");
        valueElement.className = "value";
        this.valueElement = valueElement;

        var cf = WebInspector.StylesSidebarPane.ColorFormat;

        if (value) {
            var self = this;

            function processValue(regex, processor, nextProcessor, valueText)
            {
                var container = document.createDocumentFragment();

                var items = valueText.replace(regex, "\0$1\0").split("\0");
                for (var i = 0; i < items.length; ++i) {
                    if ((i % 2) === 0) {
                        if (nextProcessor)
                            container.appendChild(nextProcessor(items[i]));
                        else
                            container.appendChild(document.createTextNode(items[i]));
                    } else {
                        var processedNode = processor(items[i]);
                        if (processedNode)
                            container.appendChild(processedNode);
                    }
                }

                return container;
            }

            function linkifyURL(url)
            {
                var hrefUrl = url;
                var match = hrefUrl.match(/['"]?([^'"]+)/);
                if (match)
                    hrefUrl = match[1];
                var container = document.createDocumentFragment();
                container.appendChild(document.createTextNode("url("));
                if (self._styleRule.sourceURL)
                    hrefUrl = WebInspector.completeURL(self._styleRule.sourceURL, hrefUrl);
                else if (WebInspector.panels.elements.selectedDOMNode())
                    hrefUrl = WebInspector.resourceURLForRelatedNode(WebInspector.panels.elements.selectedDOMNode(), hrefUrl);
                var hasResource = !!WebInspector.resourceForURL(hrefUrl);
                // FIXME: WebInspector.linkifyURLAsNode() should really use baseURI.
                container.appendChild(WebInspector.linkifyURLAsNode(hrefUrl, url, undefined, !hasResource));
                container.appendChild(document.createTextNode(")"));
                return container;
            }

            function processColor(text)
            {
                try {
                    var color = new WebInspector.Color(text);
                } catch (e) {
                    return document.createTextNode(text);
                }

                var format = getFormat();
                var hasSpectrum = self._parentPane;
                var spectrum = hasSpectrum ? self._parentPane._spectrum : null;

                var swatchElement = document.createElement("span");
                var swatchInnerElement = swatchElement.createChild("span", "swatch-inner");
                swatchElement.title = WebInspector.UIString("Click to open a colorpicker. Shift-click to change color format");

                swatchElement.className = "swatch";

                swatchElement.addEventListener("mousedown", consumeEvent, false);
                swatchElement.addEventListener("click", swatchClick, false);
                swatchElement.addEventListener("dblclick", consumeEvent, false);

                swatchInnerElement.style.backgroundColor = text;

                var scrollerElement = hasSpectrum ? self._parentPane._computedStylePane.element.parentElement : null;

                function spectrumChanged(e)
                {
                    color = e.data;

                    var colorString = color.toString();

                    colorValueElement.textContent = colorString;
                    spectrum.displayText = colorString;
                    swatchInnerElement.style.backgroundColor = colorString;

                    self.applyStyleText(nameElement.textContent + ": " + valueElement.textContent, false, false, false);
                }

                function spectrumHidden(event)
                {
                    scrollerElement.removeEventListener("scroll", repositionSpectrum, false);
                    var commitEdit = event.data;
                    var propertyText = !commitEdit && self.originalPropertyText ? self.originalPropertyText : (nameElement.textContent + ": " + valueElement.textContent);
                    self.applyStyleText(propertyText, true, true, false);
                    spectrum.removeEventListener(WebInspector.Spectrum.Events.ColorChanged, spectrumChanged);
                    spectrum.removeEventListener(WebInspector.Spectrum.Events.Hidden, spectrumHidden);

                    delete self._parentPane._isEditingStyle;
                    delete self.originalPropertyText;
                }

                function repositionSpectrum()
                {
                    spectrum.reposition(swatchElement);
                }

                function swatchClick(e)
                {
                    // Shift + click toggles color formats.
                    // Click opens colorpicker, only if the element is not in computed styles section.
                    if (!spectrum || e.shiftKey)
                        changeColorDisplay(e);
                    else {
                        var visible = spectrum.toggle(swatchElement, color, format);

                        if (visible) {
                            spectrum.displayText = color.toString(format);
                            self.originalPropertyText = self.property.propertyText;
                            self._parentPane._isEditingStyle = true;
                            spectrum.addEventListener(WebInspector.Spectrum.Events.ColorChanged, spectrumChanged);
                            spectrum.addEventListener(WebInspector.Spectrum.Events.Hidden, spectrumHidden);

                            scrollerElement.addEventListener("scroll", repositionSpectrum, false);
                        }
                    }
                    e.consume(true);
                }

                function getFormat()
                {
                    var format;
                    var formatSetting = WebInspector.settings.colorFormat.get();
                    if (formatSetting === cf.Original)
                        format = cf.Original;
                    else if (color.nickname)
                        format = cf.Nickname;
                    else if (formatSetting === cf.RGB)
                        format = (color.simple ? cf.RGB : cf.RGBA);
                    else if (formatSetting === cf.HSL)
                        format = (color.simple ? cf.HSL : cf.HSLA);
                    else if (color.simple)
                        format = (color.hasShortHex() ? cf.ShortHEX : cf.HEX);
                    else
                        format = cf.RGBA;

                    return format;
                }

                var colorValueElement = document.createElement("span");
                colorValueElement.textContent = color.toString(format);

                function nextFormat(curFormat)
                {
                    // The format loop is as follows:
                    // * original
                    // * rgb(a)
                    // * hsl(a)
                    // * nickname (if the color has a nickname)
                    // * if the color is simple:
                    //   - shorthex (if has short hex)
                    //   - hex
                    switch (curFormat) {
                        case cf.Original:
                            return color.simple ? cf.RGB : cf.RGBA;

                        case cf.RGB:
                        case cf.RGBA:
                            return color.simple ? cf.HSL : cf.HSLA;

                        case cf.HSL:
                        case cf.HSLA:
                            if (color.nickname)
                                return cf.Nickname;
                            if (color.simple)
                                return color.hasShortHex() ? cf.ShortHEX : cf.HEX;
                            else
                                return cf.Original;

                        case cf.ShortHEX:
                            return cf.HEX;

                        case cf.HEX:
                            return cf.Original;

                        case cf.Nickname:
                            if (color.simple)
                                return color.hasShortHex() ? cf.ShortHEX : cf.HEX;
                            else
                                return cf.Original;

                        default:
                            return null;
                    }
                }

                function changeColorDisplay(event)
                {
                    do {
                        format = nextFormat(format);
                        var currentValue = color.toString(format || "");
                    } while (format && currentValue === color.value && format !== cf.Original);

                    if (format)
                        colorValueElement.textContent = currentValue;
                }

                var container = document.createElement("nobr");
                container.appendChild(swatchElement);
                container.appendChild(colorValueElement);
                return container;
            }

            var colorRegex = /((?:rgb|hsl)a?\([^)]+\)|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|\b\w+\b(?!-))/g;
            var colorProcessor = processValue.bind(window, colorRegex, processColor, null);

            valueElement.appendChild(processValue(/url\(\s*([^)\s]+)\s*\)/g, linkifyURL, WebInspector.CSSKeywordCompletions.isColorAwareProperty(self.name) ? colorProcessor : null, value));
        }

        this.listItemElement.removeChildren();
        nameElement.normalize();
        valueElement.normalize();

        if (!this.treeOutline)
            return;

        // Append the checkbox for root elements of an editable section.
        if (enabledCheckboxElement && this.treeOutline.section && this.parent.root && !this.section.computedStyle)
            this.listItemElement.appendChild(enabledCheckboxElement);
        this.listItemElement.appendChild(nameElement);
        this.listItemElement.appendChild(document.createTextNode(": "));
        this.listItemElement.appendChild(this._expandElement);
        this.listItemElement.appendChild(valueElement);
        this.listItemElement.appendChild(document.createTextNode(";"));

        if (!this.parsedOk) {
            // Avoid having longhands under an invalid shorthand.
            this.hasChildren = false;
            this.listItemElement.addStyleClass("not-parsed-ok");

            // Add a separate exclamation mark IMG element with a tooltip.
            var exclamationElement = document.createElement("img");
            exclamationElement.className = "exclamation-mark";
            exclamationElement.title = WebInspector.CSSCompletions.cssNameCompletions.keySet()[this.property.name.toLowerCase()] ? WebInspector.UIString("Invalid property value.") : WebInspector.UIString("Unknown property name.");
            this.listItemElement.insertBefore(exclamationElement, this.listItemElement.firstChild);
        }
        if (this.property.inactive)
            this.listItemElement.addStyleClass("inactive");
    }