function (result) {
                if (!result || !result.selected) {
                    return;
                }
                newRelations.push({
                    source: source,
                    target: result,
                    type: "affects",
                    "one-way": false
                });
            }