function (selector) {
        this.read_only = IPython.read_only;
        this.element = $(selector);
        this.element.scroll();
        this.element.data("notebook", this);
        this.next_prompt_number = 1;
        this.kernel = null;
        this.clipboard = null;
        this.paste_enabled = false;
        this.dirty = false;
        this.metadata = {};
        // single worksheet for now
        this.worksheet_metadata = {};
        this.control_key_active = false;
        this.notebook_id = null;
        this.notebook_path = null;
        this.notebook_name = null;
        this.notebook_name_blacklist_re = /[\/\\:]/;
        this.nbformat = 3 // Increment this when changing the nbformat
        this.nbformat_minor = 0 // Increment this when changing the nbformat
        this.style();
        this.create_elements();
        this.bind_events();

        //this.keyMap = 'vim';

    }