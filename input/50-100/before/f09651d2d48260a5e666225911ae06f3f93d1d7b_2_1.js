function(router, getAction) {
    router.add('/', getAction('home', 'index'));
    router.add('/projects', getAction('home', 'projects'));
}