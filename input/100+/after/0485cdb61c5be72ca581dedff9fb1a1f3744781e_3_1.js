function (type, newOne, oldOne, changedOnly) {
        if (type !== 'user' && type !== 'group' && type !== 'userstore') {
            throw new Error('Unknown type for comparison: ' + type);
        }
        switch (type) {
        case 'user':
            return this.compareUsers(newOne, oldOne, changedOnly);
        case 'group':
            return this.compareGroups(newOne, oldOne, changedOnly);
        case 'userstore':
            return this.compareUserstores(newOne, oldOne, changedOnly);
        default:
            return {};
        }
    }