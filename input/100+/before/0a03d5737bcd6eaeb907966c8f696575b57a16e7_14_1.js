function (key, index) {
            var comp;
            if (key === "number") {
                comp = {
                    target: "${*.recordtype}.html?csid=${*.csid}",
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
        }