function _addPrivateKey(key) {
    if (walletIsFull())
        return false;

    if (key == null ) {
        throw 'Unable to generate a new bitcoin address.';
    }

    var addr = key.getBitcoinAddress();

    console.log('Add Address ' + addr);

    if (addr == null) {
        throw 'Generated invalid bitcoin address.';
    }

    if (internalAddKey(addr, encodePK(key.priv))) {
        addresses[addr].tag = 1; //Mark as unsynced

        makeNotice('info', 'new-address', 'Generated new bitcoin address ' + addr);

        //Subscribe to tranaction updates through websockets
        try {
            ws.send('{"op":"addr_sub", "addr":"'+addr+'"}');
        } catch (e) { }
    } else {
        throw 'Unable to add generated bitcoin address.';
    }

    return addr;
}