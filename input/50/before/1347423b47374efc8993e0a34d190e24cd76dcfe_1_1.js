function (piece_id) {
    if (typeof(piece_id) != 'string' && typeof(piece_id) != 'number') return false;
    return ['claim', {piece_id: piece_id.toString()}];
}