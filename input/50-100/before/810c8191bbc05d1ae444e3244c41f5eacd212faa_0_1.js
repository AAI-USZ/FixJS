function(row)
    {
        var node = row.getElementsByClassName("logCounterValue");
        if (!node)
            return;

        node = node.item(0);

        var count = parseInt(node.textContent);
        if (isNaN(count))
            count = 1;

        node.textContent = count + 1;
    }