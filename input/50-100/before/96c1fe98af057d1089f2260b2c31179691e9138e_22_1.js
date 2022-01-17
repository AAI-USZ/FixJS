function _extractTagName(ctx) {
        if (ctx.token.state.tagName) {
            return ctx.token.state.tagName; //XML mode
        } else {
            return ctx.token.state.htmlState.tagName; //HTML mode
        }
    }