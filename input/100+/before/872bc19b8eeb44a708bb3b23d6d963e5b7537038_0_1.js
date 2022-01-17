function(response) {
                $.each(response, function() {
                        if (this && this.data.children) {
                            $.each(this.data.children, function() {
                                    if(this.data.name == parent_id) {
                                        parent= this.data.body_html; 
                                    }
                                });
                        }
                    });
                if(parent) {
                    /* make a parent div for the contents of the fetch */
                    thing.find(".noncollapsed .md")
                        .before('<div class="parent rounded">' +
                                $.unsafe(parent) +
                                '</div>'); 
                }
                $(elem).parent("li").andSelf().remove();
            }