function include(filepath) {
    try {
        filepath = include.resolve(filepath);
        load(filepath);
    }
    catch (e) {
        console.log('Cannot include "' + filepath + '": '+e);
    }
}