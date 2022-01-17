function include(filepath) {
    try {
        filepath = include.resolve(filepath);
        load(filepath);
    }
    catch (e) {
        console.log('Cannot include "' + env.dirname + '/' + filepath + '": '+e);
    }
}