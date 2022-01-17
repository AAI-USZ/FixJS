function(row)
    {
        var counter = row.getElementsByClassName("logCounter").item(0);
        if (!counter)
            return;
        var value = counter.getElementsByClassName("logCounterValue");
        if (!value)
            return;

        value = value.item(0);

        var count = parseInt(value.textContent);
        if (isNaN(count))
            count = 1;

        count++;
        counter.setAttribute("count", count);
        value.textContent = count;
    }