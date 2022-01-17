function(context, textBox, cycle)
    {
        if (!textBox.value && !cycle)
        {
            // Don't complete an empty field.
            return false;
        }

        var offset = textBox.selectionStart; // defines the cursor position

        var found = this.pickCandidates(textBox, context, cycle);

        if (!found)
            this.reset();

        return found;
    }