function (token, idx, type) {
    // token=the matched data
    // idx=when using array of patterns, the index of the matched pattern
    // type=string identifiers used in the rule definition
    switch (type) {
        case 'array-start':
            stack.push([])
            inArray = true
        break
        case 'array-end':
            inArray = false
        break
        case 'string':
            if (inArray)
                stack[ stack.length-1 ].push(token)
            else
                throw new Error('only Arrays supported')
        break
        case 'separator':
        break
        default:
            throw new Error('Unknown type: ' + type)
    }
}