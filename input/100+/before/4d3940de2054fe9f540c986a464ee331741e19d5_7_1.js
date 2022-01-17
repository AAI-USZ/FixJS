function Scope(parent) {
        this.names = {};        // names defined in this scope
        this.mangled = {};      // mangled names (orig.name => mangled)
        this.rev_mangled = {};  // reverse lookup (mangled => orig.name)
        this.cname = -1;        // current mangled name
        this.refs = {};         // names referenced from this scope
        this.uses_with = false; // will become TRUE if with() is detected in this or any subscopes
        this.uses_eval = false; // will become TRUE if eval() is detected in this or any subscopes
        this.parent = parent;   // parent scope
        this.children = [];     // sub-scopes
        if (parent) {
                this.level = parent.level + 1;
                parent.children.push(this);
        } else {
                this.level = 0;
        }
}