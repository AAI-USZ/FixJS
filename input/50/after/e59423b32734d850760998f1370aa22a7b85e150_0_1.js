function harmonize(src, options) {
    options = options || {};
    src = processShorthands(src, options);
    src = processMethods(src, options);
    return processModules(src, options, moduleStyles[options.style]);
}