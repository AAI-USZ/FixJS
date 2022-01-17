function(p) {
        this.parent     = p;
        this.diffId     = {wont:123,work:321}; // For diff computation.
        this.inOrder    = 0xdeadbeef; // Also for diff computation.
        this.nodeType   = null;
        this.children   = null;
        this.matched    = null;
        if (p)
            this.depth      = p.depth + 1;
        else
            this.depth      = 0;

        this.beginTag   = null;
        this.endTag     = null;
        this.text       = null;
    }