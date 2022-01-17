function() {
        var lineEl = this.getLine();
        if (this.isLastLine) {
            lineEl = lineEl.add(
            $('<span>').addClass('divide').append(
            $('<span>').addClass('divide-text').text('分界线')));
        }
        lineEl.appendTo(this.hallEl);
        this.itemMatrix.push(lineEl);
    }