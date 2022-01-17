function(entry) {
            // todo: should we create a deep copy?
            // todo: do a deep conversion?

            for (var n in entry)
            {
                if (convert.isDateString(entry[n]))
                    entry[n] = convert.toDateFromString(entry[n]);
            }

            return entry;
        }