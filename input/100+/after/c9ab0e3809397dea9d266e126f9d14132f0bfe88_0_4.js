function () {
    return comb.serial([
        function () {
            return DB.forceDropTable(["staff", "executive", "manager", "employee"]);
        },
        comb.hitch(patio, "disconnect")
    ]);
}