function Controller( options ){
        this.menu = options.menu || "i-dropdown-menu";
        this.scroll = options.scroll || "i-dropdown-scroll";
        this.push = options.push || "i-dropdown-push";
        this.elements = options.elements || "li > a";
        this.scrolloptions = options.scrolloptions || {};
    }