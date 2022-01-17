function()
    {
        // Clean up all menu items
        this.menu.removeAll();
        
        // Show home item
        this.menu.addMenuItem(new MenuItem('user-home', _("Home Folder"), settings.get_string('file-manager')));

        // Show desktop item
        if (settings.get_boolean('show-desktop-item')) {
            let desktop_folder = GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_DESKTOP);
            this.menu.addMenuItem(new MenuItem('user-desktop', _("Desktop"), settings.get_string('file-manager') + " \"" + desktop_folder.replace(" ","\ ") + "\""));
        }

        // Show trash item
        if (settings.get_boolean('show-trash-item')) {
            //this.menu.addMenuItem(new TrashMenuItem(_("Trash")));
            
            this.trash_file = Gio.file_new_for_uri("trash:///");
            
            // Monitor trash changes
            this.monitor = this.trash_file.monitor_directory(0, null, null);
            this._trashChanged = this.monitor.connect('changed', Lang.bind(this, this._refreshTrashSection));

            this._trash_section = new PopupMenu.PopupMenuSection();
            this._trash_section.addMenuItem(new TrashMenuItem(this.trash_file));
            this.menu.addMenuItem(this._trash_section);
        }

        // Show bookmarks section
        if (settings.get_boolean('show-bookmarks-section')) {
            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            if (settings.get_boolean('collapse-bookmarks-section')) {
                this._bookmarks_section = new PopupMenu.PopupSubMenuMenuItem(_("Bookmarks"));
            } else {
                this._bookmarks_section = new PopupMenu.PopupMenuSection();
            }
            // Monitor bookmarks changes
            this._bookmarksChanged = Main.placesManager.connect('bookmarks-updated', Lang.bind(this, this._refreshBookmarks));

            this._createBookmarksSection();
            this.menu.addMenuItem(this._bookmarks_section);
        }   
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        // Show computer item
        this.menu.addMenuItem(new MenuItem('computer', _("Computer"), settings.get_string('file-manager') + " computer:///"));

        // Show file system item
        if (settings.get_boolean('show-filesystem-item')) {
            this.menu.addMenuItem(new MenuItem('drive-harddisk', _("File System"), settings.get_string('file-manager') + " /"));
        }

        // Show devices section
        if (settings.get_boolean('show-devices-section')) {
            // Monitor mounts changes
            this._devicesChanged = Main.placesManager.connect('mounts-updated', Lang.bind(this, this._refreshDevicesSection));

            if (settings.get_boolean('collapse-devices-section')) {
                this._devices_section = new PopupMenu.PopupSubMenuMenuItem(_("Removable Devices"));
            } else {
                this._devices_section = new PopupMenu.PopupMenuSection();
            }
            this._createDevicesSection();
            this.menu.addMenuItem(this._devices_section);
        }

        // Show network section
        if (settings.get_boolean('show-network-section')) {
            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            if (settings.get_boolean('collapse-network-section')) {
                this._network_section = new PopupMenu.PopupSubMenuMenuItem(_("Network"));
            } else {
                this._network_section = new PopupMenu.PopupMenuSection();
            }
            
            let network_item = new MenuItem('network-workgroup', _("Network"), settings.get_string('file-manager') + " network:///");
            if (this._network_section.menu) { this._network_section.menu.addMenuItem(network_item) } else { this._network_section.addMenuItem(network_item) }
            let connect_item = new MenuItem('gnome-globe', _("Connect to..."), settings.get_string('connect-command'));
            if (this._network_section.menu) { this._network_section.menu.addMenuItem(connect_item) } else { this._network_section.addMenuItem(connect_item) }
            
            this.menu.addMenuItem(this._network_section);
        }

        if (settings.get_boolean('show-search-item') || settings.get_boolean('show-documents-section')) {
            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            // Show search section
            if (settings.get_boolean('show-search-item')) {
                this.menu.addMenuItem(new MenuItem('search', _("Search"), settings.get_string('search-command')));
            }
            // Show recent documents section
            if (settings.get_boolean('show-documents-section')) {
                this.recentManager = new Gtk.RecentManager();
                this._recent_section = new PopupMenu.PopupSubMenuMenuItem(_("Recent documents"));
                // Monitor recent documents changes 
                this._recentChanged = this.recentManager.connect('changed', Lang.bind(this, this._refreshRecent));
                
                this._createRecentSection();
                this.menu.addMenuItem(this._recent_section);
            }
        }
        
    }