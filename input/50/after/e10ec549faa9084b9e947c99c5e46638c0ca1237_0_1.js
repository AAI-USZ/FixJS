function(Y, jplag_support, moss_support) {
        this.Y = Y;
        this.init_mandatory_field(Y);
        this.init_disable_unsupported_tool(Y, jplag_support, moss_support);
    }