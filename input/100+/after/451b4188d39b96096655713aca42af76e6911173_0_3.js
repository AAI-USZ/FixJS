function () {
                var headword, pos, changed = false, sense;

                if (this.selected === null || this._senseRequest !== null) {
                    return;
                }

                // headword
                headword = $('#anno-form-headword').val();
                if (headword == this.selected.text()) {
                    this.selected.removeAttr('headword');
                }
                else {
                    this.selected.attr('headword', headword);
                }

                // pos
                pos = this.getPos();
                if (pos) {
                    this.selected.attr('pos', pos);
                }
                else {
                    this.selected.removeAttr('pos');
                }

                // attributive
                if ($('#anno-form-attributive').attr('checked')) {
                    this.selected.attr('attributive', 'true');
                }
                else {
                    this.selected.removeAttr('attributive');
                }

                // hidden
                if ($('#anno-form-hidden').attr('checked')) {
                    this.selected.get(0).setAttribute('data-hidden', 'true');
                }
                else {
                    this.selected.get(0).removeAttribute('data-hidden');
                }

                // sense
                sense = this.getSense();
                if (sense) {
                    this.selected.attr('sense', sense);
                }
                else {
                    this.selected.removeAttr('sense');
                }

                // show that it is changed to the user
                this.selected.addClass(this.mode == 'edit' ? 'changed' : 'added');
            }