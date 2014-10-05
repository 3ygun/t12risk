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

    Cell.prototype.updateTeam = function (team) {
        this.teamVal = team;
    };

    Cell.prototype.updateTroops = function (troops) {
        this.troopsVal = troops;
    };
    return Cell;
})();

var GameBoard = (function () {
    function GameBoard(cells) {
        this.deathCountVal = 0;
        this.turnCountVal = 0;
        this.gameStatsElement = document.getElementById("game_stats");
        this.totalLossesElement = document.getElementById("total_losses");

        this.a1 = document.getElementById("a1");
        this.a2 = document.getElementById("a2");
        this.b1 = document.getElementById("b1");
        this.b2 = document.getElementById("b2");

        this.a1tnum = document.getElementById("a1_tnum");
        this.a2tnum = document.getElementById("a2_tnum");
        this.b1tnum = document.getElementById("b1_tnum");
        this.b2tnum = document.getElementById("b2_tnum");

        // Set the colors
        this.a1.style.backgroundColor = cells.get("a1").team();
        this.a2.style.backgroundColor = cells.get("a2").team();
        this.b1.style.backgroundColor = cells.get("b1").team();
        this.b2.style.backgroundColor = cells.get("b2").team();
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

        // Currently we do not have "game_stats" as a thing here
        return element;
    };

    GameBoard.prototype.updateColor = function (idName, color) {
        this.getHTMLElement(idName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    };

    GameBoard.prototype.updateTroops = function (idName, troops) {
        this.getHTMLElement(idName).innerHTML = "<h2>" + idName.toLocaleUpperCase() + "</h2> <h3>" + troops + "</h3>";
    };

    GameBoard.prototype.incrementDC = function () {
        this.deathCountVal++;
    };

    GameBoard.prototype.incrementAC = function () {
        this.turnCountVal++;
    };

    GameBoard.prototype.gameStats = function (tLosses) {
        this.totalLossesElement.innerHTML = "<h4>Total Losses: " + tLosses + "</h4>";
        this.gameStatsElement.innerHTML = "<h3>Last Game:</h3> <h4>" + this.deathCountVal + " dead in " + this.turnCountVal + " turns</h4>";
    };

    GameBoard.prototype.troopLosses = function () {
        return this.deathCountVal;
    };
    return GameBoard;
})();

var Controller = (function () {
    function Controller() {
        this.command = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.cells = new Map();
        this.cells.set("a1", new Cell("a1", "red", 10));
        this.cells.set("a2", new Cell("a2", "green", 10));
        this.cells.set("b1", new Cell("b1", "blue", 10));
        this.cells.set("b2", new Cell("b2", "yellow", 10));

        this.board = new GameBoard(this.cells);
        this.totalLosses = 0;
        //Make a twitch object that can return the command to be executed (will be called in action())
    }
    Controller.prototype.randomNumber = function (upper, lower) {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    };

    Controller.prototype.fakeCommand = function () {
        var num = this.randomNumber(7, 0);

        return this.command[num];
    };

    Controller.prototype.endGame = function () {
        var isWinner = false;
        var aTeam = this.cells.get("a1").team();

        if (aTeam == this.cells.get("a2").team()) {
            if (aTeam == this.cells.get("b1").team()) {
                if (aTeam == this.cells.get("b2").team()) {
                    isWinner = true;
                }
            }
        }

        return isWinner;
    };

    Controller.prototype.resetGame = function () {
        this.cells.get("a1").updateTeam("red");
        this.cells.get("a2").updateTeam("green");
        this.cells.get("b1").updateTeam("blue");
        this.cells.get("b2").updateTeam("yellow");

        this.cells.get("a1").updateTroops(10);
        this.cells.get("a2").updateTroops(10);
        this.cells.get("b1").updateTroops(10);
        this.cells.get("b2").updateTroops(10);

        this.board = new GameBoard(this.cells);
    };

    Controller.prototype.preformAttack = function (attacker, defender) {
        var success;
        this.board.incrementAC();

        while (attacker.troops() > 1 && defender.troops() > 0) {
            var attackerRoll = this.randomNumber(6, 1);
            var defenderRoll = this.randomNumber(6, 1);

            if (defenderRoll >= attackerRoll) {
                attacker.updateTroops(attacker.troops() - 1);
                success = false;
            } else {
                defender.updateTroops(defender.troops() - 1);
                success = true;
            }
            this.board.incrementDC();
        }
        return success;
    };

    Controller.prototype.actionEvent = function (event) {
        var attacker;
        var defender;

        if (event == "a") {
            attacker = this.cells.get("a1");
            defender = this.cells.get("a2");
        } else if (event == "b") {
            attacker = this.cells.get("a2");
            defender = this.cells.get("b2");
        } else if (event == "c") {
            attacker = this.cells.get("b2");
            defender = this.cells.get("b1");
        } else if (event == "d") {
            attacker = this.cells.get("b1");
            defender = this.cells.get("a1");
        } else if (event == "e") {
            attacker = this.cells.get("a2");
            defender = this.cells.get("a1");
        } else if (event == "f") {
            attacker = this.cells.get("b2");
            defender = this.cells.get("a2");
        } else if (event == "g") {
            attacker = this.cells.get("b1");
            defender = this.cells.get("b2");
        } else if (event == "h") {
            attacker = this.cells.get("a1");
            defender = this.cells.get("b1");
        } else {
            attacker = this.cells.get("a1");
            defender = this.cells.get("a2");
        }

        // Make sure it isn't friendly fire!8)
        if (!(attacker.team() == defender.team())) {
            // Add more troops
            attacker.updateTroops(attacker.troops() + 3);

            var aWin = this.preformAttack(attacker, defender);
            if (aWin) {
                defender.updateTeam(attacker.team());
                defender.updateTroops(attacker.troops() - 1);
                attacker.updateTroops(1);
                this.board.updateColor(defender.name(), defender.team());
            }

            this.board.updateTroops(attacker.name(), attacker.troops());
            this.board.updateTroops(defender.name(), defender.troops());
        }
    };

    Controller.prototype.action = function () {
        if (!this.endGame()) {
            this.actionEvent(this.fakeCommand());
        } else {
            this.totalLosses = this.totalLosses + this.board.troopLosses();
            this.board.gameStats(this.totalLosses);
            this.resetGame();
        }
    };
    return Controller;
})();

window.onload = function () {
    var ctl = new Controller();

    //ctl.attack(ctl.a2, ctl.a1);
    setInterval(function () {
        ctl.action();
    }, 500);
};
//# sourceMappingURL=app.js.map
