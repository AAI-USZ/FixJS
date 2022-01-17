function(router, getAction) {
    router.add('/', getAction('home', 'index'));

    router.add('/create', getAction('home', 'create'));
    router.add('/get', getAction('home', 'get'));
    router.add('/delete', getAction('home', 'delete'));

    router.add('/projects', getAction('home', 'projects'));
}