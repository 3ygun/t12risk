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

var GameBoard = (function () {
    function GameBoard(cell1, cell2, cell3, cell4) {
        this.a1 = cell1;
        this.a2 = cell2;
        this.b1 = cell3;
        this.b2 = cell4;
    }
    GameBoard.prototype.changeColor = function (cellName, color) {
        if (cellName == "a1") {
            this.a1.style.backgroundColor = color;
        }
    };
    return GameBoard;
})();

var Controller = (function () {
    function Controller() {
        this.a1 = new Cell("a1", "red", 10);
        this.a2 = new Cell("a2", "white", 10);
        this.b1 = new Cell("b1", "blue", 10);
        this.b2 = new Cell("b2", "blue", 10);

        var cell_1 = document.getElementById('a1');
        var cell_2 = document.getElementById('a2');
        var cell_3 = document.getElementById('b1');
        var cell_4 = document.getElementById('b2');

        this.board = new GameBoard(cell_1, cell_2, cell_3, cell_4);
    }
    Controller.prototype.attack = function (attacker, defender) {
        //defender.troops = 0;
        defender.updateCell(attacker.team(), attacker.troops() - 1);
        this.board.changeColor(defender.name(), defender.team());
    };
    return Controller;
})();

window.onload = function () {
    var ctl = new Controller();
    ctl.attack(ctl.a2, ctl.a1);
};
//# sourceMappingURL=app.js.map
