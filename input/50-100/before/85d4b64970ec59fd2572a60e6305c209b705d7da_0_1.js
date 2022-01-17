function()
    {
        let children = this.trash_file.enumerate_children('*', 0, null, null);
        let child_info = null;
        while ((child_info = children.next_file(null, null)) != null) {
            let child = this.trash_file.get_child(child_info.get_name());
            child.delete(null);
        }
    }