function(place) {
	this.parent();

	this.place = place;

	this.label = new St.Label({ text: place.name });
	this.addActor(this.label);
        this.actor.label_actor = this.label;

	let ejectIcon = new St.Icon({ icon_name: 'media-eject',
				      icon_type: St.IconType.SYMBOLIC,
				      style_class: 'popup-menu-icon ' });
	let ejectButton = new St.Button({ child: ejectIcon });
	ejectButton.connect('clicked', Lang.bind(this, this._eject));
	this.addActor(ejectButton);
    }