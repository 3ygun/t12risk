var Cell = (function () {
    function Cell(name, team, troops) {
        this.nameVal = name;
        this.teamVal = team;
        this.troopsVal = troops;
    }
    Cell.prototype.name = function () {
        return this.nameVal;
    };

    Cell.prototype.team = function () {
        return this.teamVal;
    };

    Cell.prototype.troops = function () {
        return this.troopsVal;
    };

    Cell.prototype.updateCell = function (team, troops) {
        this.teamVal = team;
        this.troopsVal = troops;
    };
    return Cell;
})();

var Control = (function () {
    function Control() {
        var cs = Cell;
        this.a1 = cs({ name: "a1", team: "red", troops: 10 });
        this.a2 = cs({ name: "a2", team: "red", troops: 10 });
        this.b1 = cs({ name: "b1", team: "blue", troops: 10 });
        this.b2 = cs({ name: "b2", team: "blue", troops: 10 });
    }
    Control.prototype.attack = function (attacker, defender) {
        //defender.troops = 0;
        defender.team = attacker.team;
    };
    return Control;
})();

var GameBoard = (function () {
    function GameBoard() {
    }
    return GameBoard;
})();

window.onload = function () {
    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
};

var c = new Control();
console.log(c.a1);
//# sourceMappingURL=app.js.map
