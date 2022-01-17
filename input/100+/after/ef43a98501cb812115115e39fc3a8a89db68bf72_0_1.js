function getOpenlayersLangCode() {
    switch(Env.lang) {
        case"cat":a="ca";
            break;
        case"dut":a="nl";
            break;
        case"eng":a="en";
            break;
        case"fin":a="fi";
            break;
        case"fre":a="fr";
            break;
        case"ger":a="de";
            break;
        case"ita":a="it";
            break;
        case"spa":a="es";
            break;
        case"nor":a="no";
            break;
        case"rus":a="ru";
            break;
        case"por":a="pt";
            break;
        case"chi":a="cn";
            break;
        default:a="en"
    }

    return a;
}