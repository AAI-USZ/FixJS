function _extractTagName(ctx) {
        if (ctx.token.state.tagName) {
            return ctx.token.state.tagName; //XML mode
        } else if (ctx.token.state.htmlState) {
            return ctx.token.state.htmlState.tagName; //HTML mode
        }
        // Some mixed modes that offer HTML as a nested mode don't actually expose the HTML state
        return null;
    }