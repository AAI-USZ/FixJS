function(gicon) {
        this.parent({ styleClass: 'show-processes-dialog' });

        let mainContentLayout = new St.BoxLayout();
        this.contentLayout.add(mainContentLayout, { x_fill: true,
                                                    y_fill: false });

        this._iconBin = new St.Bin({ child: _createIcon(gicon) });
        mainContentLayout.add(this._iconBin,
                              { x_fill:  true,
                                y_fill:  false,
                                x_align: St.Align.END,
                                y_align: St.Align.MIDDLE });

        let messageLayout = new St.BoxLayout({ vertical: true });
        mainContentLayout.add(messageLayout,
                              { y_align: St.Align.START });

        this.subjectLabel = new St.Label({ style_class: 'show-processes-dialog-subject' });

        messageLayout.add(this.subjectLabel,
                          { y_fill:  false,
                            y_align: St.Align.START });

        this.descriptionLabel = new St.Label({ style_class: 'show-processes-dialog-description' });
        this.descriptionLabel.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
        this.descriptionLabel.clutter_text.line_wrap = true;

        messageLayout.add(this.descriptionLabel,
                          { y_fill:  true,
                            y_align: St.Align.START });

        let scrollView = new St.ScrollView({ style_class: 'show-processes-dialog-app-list'});
        scrollView.set_policy(Gtk.PolicyType.NEVER,
                              Gtk.PolicyType.AUTOMATIC);
        this.contentLayout.add(scrollView,
                               { x_fill: true,
                                 y_fill: true });
        scrollView.hide();

        this._applicationList = new St.BoxLayout({ vertical: true });
        scrollView.add_actor(this._applicationList,
                             { x_fill:  true,
                               y_fill:  true,
                               x_align: St.Align.START,
                               y_align: St.Align.MIDDLE });

        this._applicationList.connect('actor-added',
                                      Lang.bind(this, function() {
                                          if (this._applicationList.get_n_children() == 1)
                                              scrollView.show();
                                      }));

        this._applicationList.connect('actor-removed',
                                      Lang.bind(this, function() {
                                          if (this._applicationList.get_n_children() == 0)
                                              scrollView.hide();
                                      }));
    }