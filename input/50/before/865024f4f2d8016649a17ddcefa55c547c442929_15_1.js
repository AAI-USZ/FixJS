function() {
            this._modalDialogMask = document.querySelector('.montage-popup-modal-mask');
            this._modalDialogMask = this._modalDialogMask || this._createModalMask();
            this._modalDialogMask.classList.remove('montage-invisible');
        }