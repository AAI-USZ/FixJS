function (delta) {
            var choices = this.results.find(".select2-result-selectable"),
                index = this.highlight();

            while (index > -1 && index < choices.length) {
                index += delta;
                if ($(choices[index]).hasClass("select2-result-selectable")) {
                    this.highlight(index);
                    break;
                }
            }
        }