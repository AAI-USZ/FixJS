function(e) {
      var form, newDesc, newInfo, newTitle, newWikiLink, this_;
      this_ = $(e.currentTarget);
      form = this.wrap.find('.edit-form');
      newTitle = this.wrap.find('[name="marker-title"]').val();
      newDesc = this.wrap.find('[name="marker-description"]').val();
      newWikiLink = this.wrap.find('[name="marker-wiki"]').val();
      form.removeClass('active');
      console.log(newWikiLink);
      newInfo = {
        id: this.marker.__gm_id,
        title: newTitle,
        desc: newDesc,
        wikiLink: newWikiLink,
        type: this.marker.type,
        cat: this.marker.cat,
        lat: this.marker.position.lat(),
        lng: this.marker.position.lng(),
        hasDefaultValue: this.marker["hasDefaultValue"]
      };
      this.wrap.find('.padding').html(this.template(newInfo));
      this.bindButton();
      this.wrap.find('.edit').removeClass('active');
      return this.onSave(newInfo);
    }