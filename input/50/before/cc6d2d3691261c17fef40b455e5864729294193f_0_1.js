function (name) {
    if (name === 'evals') return require('vm')
    else throw new Error('No such module')
}