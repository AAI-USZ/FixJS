function (event) {
            var piButton = this.application.eventManager.componentClaimingPointer("mouse");
            if(piButton) {
                this.selectedMaterialNode = piButton.element;
            } else {
                this.selectedMaterialNode = null;
            }

            this.materialId = event.detail.materialId;
            this._showMaterialPopup(event.detail);
        }