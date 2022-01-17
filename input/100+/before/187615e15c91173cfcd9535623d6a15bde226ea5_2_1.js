function subr(code)
{
    code = flatten(code);
    var codeBlock = _asm(code).codeBlock;
    codeBlock.assemble();
    //print(codeBlock.listingString());

    code = clean(codeBlock.code);
    var length = code.length;

    var f = photon.send(photon["function"], "__new__", length, 0);
    photon.send(f, "__intern__", code);

    return f;
}