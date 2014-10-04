var Cell = (function () {
    function Cell(name, team, troops) {
    }
    return Cell;
})();

var Control = (function () {
    function Control() {
        var cs = Cell;
        var a1 = cs({ name: "a1", team: "red", troops: 10 });
        var a2 = cs({ name: "a2", team: "red", troops: 10 });
        var b1 = cs({ name: "b1", team: "blue", troops: 10 });
        var b2 = cs({ name: "b2", team: "blue", troops: 10 });
    }
    return Control;
})();
//# sourceMappingURL=app.js.map
