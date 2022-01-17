function(textBox)
    {
        if (!adjustSelectionOnAccept)
            return false;

        var value = textBox.value;
        var offset = textBox.selectionStart;
        var offsetEnd = textBox.selectionEnd;
        if (!candidates || value !== lastValue || offset !== lastOffset || offset >= offsetEnd)
            return false;

        var ind = adjustSelectionOnAccept(value, offsetEnd);
        if (ind === null)
            return false;

        textBox.setSelectionRange(ind, ind);
        return true;
    }