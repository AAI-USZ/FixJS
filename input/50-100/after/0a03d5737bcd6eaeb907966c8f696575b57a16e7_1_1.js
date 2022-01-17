function (string) {
        if (!string) {
            return {
                urn: "",
                displayName: ""
            };
        }
        else if (string.substring(0, 4) === "urn:") {
            return {
                urn: string,
                displayName: cspace.util.urnToString(string)
            };
        }
        else {
            return {
                urn: "urn:error:in:application:layer:every:autocomplete:field:must:have:an:urn",
                displayName: string
            };
        }
    }