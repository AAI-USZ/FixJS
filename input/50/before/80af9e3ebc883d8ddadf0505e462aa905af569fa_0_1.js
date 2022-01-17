function (result) {
                if (!result.selected) {
                    return;
                }
                newRelations.push({
                    source: source,
                    target: result,
                    type: "affects",
                    "one-way": false
                });
            }