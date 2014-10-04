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
    function GameBoard(cell1, cell2, cell3, cell4, cell1tnum, cell2tnum, cell3tnum, cell4tnum) {
        this.a1 = cell1;
        this.a2 = cell2;
        this.b1 = cell3;
        this.b2 = cell4;

        this.a1tnum = cell1tnum;
        this.a2tnum = cell2tnum;
        this.b1tnum = cell3tnum;
        this.b2tnum = cell4tnum;
    }
    GameBoard.prototype.getHTMLElement = function (elementName) {
        var element;

        if (elementName == "a1") {
            element = this.a1;
        } else if (elementName == "a2") {
            element = this.a2;
        } else if (elementName == "b1") {
            element = this.b1;
        } else if (elementName == "b2") {
            element = this.b2;
        } else if (elementName == "b2") {
            element = this.b2;
        } else if (elementName == "a1_tnum") {
            element = this.a1tnum;
        } else if (elementName == "a2_tnum") {
            element = this.a2tnum;
        } else if (elementName == "b1_tnum") {
            element = this.b1tnum;
        } else if (elementName == "b2_tnum") {
            element = this.b2tnum;
        }

        return element;
    };

    GameBoard.prototype.changeColor = function (idName, color) {
        this.getHTMLElement(idName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    };

    GameBoard.prototype.changeTroops = function (idName, troops) {
        this.getHTMLElement(idName).innerHTML = "" + troops;
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

        var cell_1_tnum = document.getElementById('a1_tnum');
        var cell_2_tnum = document.getElementById('a2_tnum');
        var cell_3_tnum = document.getElementById('b1_tnum');
        var cell_4_tnum = document.getElementById('b2_tnum');

        this.board = new GameBoard(cell_1, cell_2, cell_3, cell_4, cell_1_tnum, cell_2_tnum, cell_3_tnum, cell_4_tnum);
        //Make a twitch object that can return the command to be executed (will be called in action())
    }
    Controller.prototype.fakeCommand = function () {
        return "a";
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
