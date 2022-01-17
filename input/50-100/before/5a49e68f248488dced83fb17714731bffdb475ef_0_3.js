function toogle_editionMode() {
    mode = get_editionMode() 
    
    if (mode == 'VISITE') {
        set_editionMode('EDITION')
    } else if (mode == 'EDITION') {
        set_editionMode('VISITE')
    }
    refresh_editionMode()
}