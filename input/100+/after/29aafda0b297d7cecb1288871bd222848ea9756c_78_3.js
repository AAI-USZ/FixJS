function(element, rules, usedProps, inheritMode)
    {
        var props = this.parseCSSProps(element.style, inheritMode);
        this.addOldProperties(this.context, Xpath.getElementXPath(element), inheritMode, props);

        this.sortProperties(props);

        this.markOverriddenProps(element, props, usedProps, inheritMode);

        if (props.length)
        {
            rules.unshift({rule: element, id: Xpath.getElementXPath(element),
                    selector: "element.style", props: props, inherited: inheritMode});
        }
    }