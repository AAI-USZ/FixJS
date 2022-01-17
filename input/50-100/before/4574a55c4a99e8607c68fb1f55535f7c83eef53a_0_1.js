function () {
                    // @todo check for radio buttons and checkboxes and save only checked
                    var type = $(this).attr("type");
                    if ((type == "radio" || type == "checkbox")) {
                        if (this.checked) {
                            data[this.name] = this.value;
                        }
                    } else {
                        data[this.name] = this.value;
                    }
                }