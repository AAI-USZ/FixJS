function() {

            var buttons = new ButtonGroup();

            if(state == 'edit') {
                this.renderSaveButton()
            } else {
                this.renderEditButton
            }

            this.div.appendChild(helpers.dom.div('button-group', [

                ( (this.state == 'edit') ?
                  this.renderSaveButton() :
                  this.renderEditButton() ),

                ( (this.contact.uid) &&
                  this.renderDeleteButton() ),

                ( (! ('photo' in this.contact)) &&
                  this.renderAddPictureButton())

            ]));
        }