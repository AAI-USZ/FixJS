function formatNumberWithDelimiters(number) {
        var delimiter = gThousandsSeparator;
        var numString = number.toString();

        if (!numString)
            return "0";
		
        var dot = numString.indexOf(gDecimalSeparator);
        if (dot == -1)
            dot = numString.length;
		
        var stop = numString.length-dot;
        var characteristic = numString.substr(0, dot);
        if (!parseInt(characteristic))
            return numString;

        // see if it's a negative number
        var numIsNegative =  (parseInt(characteristic) < 0)

        var newNumber = "";
        var delimiterCount = Math.floor((characteristic.length-1) / 3);
        var extras = characteristic.length % 3;
        if (!extras && characteristic.length > 2)
            extras = 3;

        if (extras)
            newNumber = newNumber + characteristic.substr(0, extras);

        for (var i=0;i< delimiterCount; i++) {
	
            if ( (0 == i) && numIsNegative && (extras == 1))
                newNumber = newNumber + characteristic.substr(extras + (i * 3), 3);
            else
                newNumber = newNumber + delimiter + characteristic.substr(extras + (i * 3), 3);
        }
	
        return (dot ? (newNumber + numString.substr(dot, stop)) : newNumber);
    }