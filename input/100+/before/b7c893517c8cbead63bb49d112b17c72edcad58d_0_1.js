function() {

    KT.widgets = {repos:{id:"repos_selector", autocomplete:'repo_autocomplete_list', search:'repo_search'},
                  packages:{id:"packages_selector", autocomplete:'package_autocomplete_list', search:'package_search'},
                  products:{id:"products_selector", autocomplete:'product_autocomplete_list'},
                  errata:{id:"errata_selector", search:'errata_search'}};

    KT.mapping = {products:['products'], repos:['products', 'repos'], packages:['products', 'repos', 'packages'],
                    errata:['products', 'repos', 'errata']};

    var search = KT.content_search(KT.available_environments);
}