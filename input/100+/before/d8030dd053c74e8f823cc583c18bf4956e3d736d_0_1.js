function switchSearchDirection(direction) {
    var all_search_blocks = $(".search-block"),
        active_search_block = $(".search-block.active"),
        search_query, active_tab, active_tab_index,
        site_search_block, web_search_block, current_tabs, current_search_block;


    site_search_block = $("#dv-site-search");
    web_search_block = $("#dv-web-search");
    search_query = active_search_block.find('.gsc-input input').val();
    active_tab = active_search_block.find('.gsc-tabHeader.gsc-tabhActive');
    active_tab_index = active_tab.index();
    alert(active_tab_index);
    switch(direction) {
        case 'site': { current_search_block = site_search_block; break; }
        case 'web': { current_search_block = web_search_block; break; }
        default: { return false; }
    }

    // делаем все блоки с поиском неактивными (на всякий)
    all_search_blocks.removeClass('active');

    // выбраный блок делаем активным и записываем поисковый запрос в инпут
    current_search_block.addClass('active').find('.gsc-input input').val(search_query);

    // кликаем на кнопку поиска
    current_search_block.find('.gsc-search-button').click();

    // делаем клик на той вкладке с типом поиска что был на предыдущем блоке поиска
    current_search_block.find('.gsc-tabsArea > :eq(' + active_tab_index + ')').click();
    current_search_block.find('.gsc-tabsAreaInvisible > :eq(' + active_tab_index + ')').click();

    return true;

}