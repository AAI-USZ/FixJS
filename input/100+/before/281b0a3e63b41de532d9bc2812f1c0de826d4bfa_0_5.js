function(icon) {
        this.parent({ styleClass: 'mount-question-dialog' });

        let mainContentLayout = new St.BoxLayout();
        this.contentLayout.add(mainContentLayout, { x_fill: true,
                                                    y_fill: false });

        this._iconBin = new St.Bin({ child: icon });
        mainContentLayout.add(this._iconBin,
                              { x_fill:  true,
                                y_fill:  false,
                                x_align: St.Align.END,
                                y_align: St.Align.MIDDLE });

        let messageLayout = new St.BoxLayout({ vertical: true });
        mainContentLayout.add(messageLayout,
                              { y_align: St.Align.START });

        this.subjectLabel = new St.Label({ style_class: 'mount-question-dialog-subject' });
        this.subjectLabel.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
        this.subjectLabel.clutter_text.line_wrap = true;

        messageLayout.add(this.subjectLabel,
                          { y_fill:  false,
                            y_align: St.Align.START });

        this.descriptionLabel = new St.Label({ style_class: 'mount-question-dialog-description' });
        this.descriptionLabel.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
        this.descriptionLabel.clutter_text.line_wrap = true;

        messageLayout.add(this.descriptionLabel,
                          { y_fill:  true,
                            y_align: St.Align.START });
    }