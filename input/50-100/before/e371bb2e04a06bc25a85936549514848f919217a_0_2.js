function (e) {
        Event.stop(e);
        this.viewsByName.details.paint(resource);
        this.alternatives.showAlternative(this.viewsByName.details);
    }