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
    GameBoard.prototype.getHTMLElement = function (cellName) {
        var element;

        if (cellName == "a1") {
            element = this.a1;
        } else if (cellName == "a2") {
            element = this.a2;
        } else if (cellName == "b1") {
            element = this.b1;
        } else if (cellName == "b2") {
            element = this.b2;
        }

        return element;
    };

    GameBoard.prototype.changeColor = function (cellName, color) {
        this.getHTMLElement(cellName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    };
    return GameBoard;
})();

var Controller = (function () {
    function Controller() {
        this.command = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.a1 = new Cell("a1", "red", 10);
        this.a2 = new Cell("a2", "white", 10);
        this.b1 = new Cell("b1", "blue", 10);
        this.b2 = new Cell("b2", "blue", 10);

        var cell_1 = document.getElementById('a1');
        var cell_2 = document.getElementById('a2');
        var cell_3 = document.getElementById('b1');
        var cell_4 = document.getElementById('b2');

        this.board = new GameBoard(cell_1, cell_2, cell_3, cell_4);
        //Make a twitch object that can return the command to be executed (will be called in action())
    }
    Controller.prototype.randomNumber = function (upper, lower) {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    };

    Controller.prototype.fakeCommand = function () {
        var num = this.randomNumber(7, 0);

        return this.command[num];
    };

    Controller.prototype.actionEvent = function (event) {
        this.board.changeColor("a1", "pink");
    };

    Controller.prototype.action = function () {
        setInterval(this.actionEvent(this.fakeCommand()), 3000);
    };

    Controller.prototype.attack = function (attacker, defender) {
        defender.updateCell(attacker.team(), attacker.troops() - 1);
        this.board.changeColor(defender.name(), defender.team());
    };
    return Controller;
})();

window.onload = function () {
    var ctl = new Controller();
    ctl.attack(ctl.a2, ctl.a1);
    ctl.action();
};
//# sourceMappingURL=app.js.map
