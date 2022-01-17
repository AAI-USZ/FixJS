function(from) {
    if (!from) return C.R_STAY;
    if (from === "STOP") return C.R_STAY; // C.R_ONCE?
    if (from === "LOOP") return C.R_LOOP;
    if (from === "BOUNCE") return C.R_BOUNCE; // FIXME: last is not for sure
}