function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ x: [document.createElement("div"), document.createElement("span")] }));
        ko.renderTemplate("x", null, { bypassDomNodeWrap: true });
    }