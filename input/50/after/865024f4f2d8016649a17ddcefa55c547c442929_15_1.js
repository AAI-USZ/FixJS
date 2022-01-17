function() {
            this._modalDialogMask = document.querySelector('.montage-Popup-modal-mask');
            this._modalDialogMask = this._modalDialogMask || this._createModalMask();
            this._modalDialogMask.classList.remove('montage-invisible');
        }