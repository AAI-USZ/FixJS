function()
    {
        var start = this.textBox.selectionStart;
        var end = this.textBox.selectionEnd;

        return this.textBox.value.substring(start, end);
    }