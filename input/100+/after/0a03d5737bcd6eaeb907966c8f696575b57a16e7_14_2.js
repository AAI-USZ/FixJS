function (columnList, recordType, vocab, selectable, labels) {
        var colDefs = fluid.transform(columnList, function (key, index) {
            var comp,
                vocabParam = "";
            if (vocab && vocab !== "all") {
                vocabParam = "&" + $.param({
                    vocab: vocab
                })
            }
            if (key === "number") {
                comp = {
                    target: "${*.recordtype}.html?csid=${*.csid}" + vocabParam,
                    linktext: "${*.number}"
                };
            } else if (key !== "csid") {
                comp = {value: "${*." + key + "}"};
            }
            return {
                key: key,
                valuebinding: "*." + key,
                components: comp,
                sortable: key !== "recordtype",
                label: labels[key]
            };
        });
        if (selectable) {
            colDefs[colDefs.length] = {
                key: "selected",
                valuebinding: "*.selected",
                sortable: false,
                label: labels["selected"]
            };
        }
        return colDefs;
    }