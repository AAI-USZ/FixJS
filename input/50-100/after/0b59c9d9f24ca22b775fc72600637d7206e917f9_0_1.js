function updateElementProperties() {
            try {
                // The expression is a function text where we pass the parameter
                // and it is executed in the context of the elements panel
                // The page contents need to be passed as a string and re-parsed
                // inside
                var expression = "(" + pageFindSassInfo.toString() + ")('" + JSON.stringify(pageContents) + "');";
                sidebar.setExpression(expression);
            } catch (error) {
                sidebar.setObject({error: error.message});
            }
        }