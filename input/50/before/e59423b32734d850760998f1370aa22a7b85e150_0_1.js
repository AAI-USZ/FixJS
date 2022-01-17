function harmonize(src, options) {
    options = options || {};
    return processModules(src, options, moduleStyles[options.style]);
}