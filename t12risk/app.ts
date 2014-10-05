﻿interface CellStatic {
    name: string;
    team: string;
    troops: number;
}

class Cell {
    private nameVal;
    private teamVal;
    private troopsVal;

    name() {
        return this.nameVal;
    }

    team() {
        return this.teamVal;
    }

    troops() {
        return this.troopsVal;
    }

    updateTeam(team: string) {
        this.teamVal = team;
    }

    updateTroops(troops: number) {
        this.troopsVal = troops;
    }

    constructor(name: string, team: string, troops: number) {
        this.nameVal = name;
        this.teamVal = team;
        this.troopsVal = troops;
    }
}

class GameBoard {
    private a1: HTMLElement;
    private a2: HTMLElement;
    private b1: HTMLElement;
    private b2: HTMLElement;

    private a1tnum: HTMLElement;
    private a2tnum: HTMLElement;
    private b1tnum: HTMLElement;
    private b2tnum: HTMLElement;

    private gameStatsElement: HTMLElement;

    private getHTMLElement(elementName: string): HTMLElement {
        var element: HTMLElement;

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
    }

    constructor(cells: Map<string, Cell>) {
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

    updateColor(idName: string, color: string) {
        this.getHTMLElement(idName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    }

    updateTroops(idName: string, troops: number) {
        this.getHTMLElement(idName).innerText = "" + troops;
    }

    gameStats() {
        this.gameStatsElement.innerText = "<h3>Last Game:</h3> <h4>" + "</h4>";
    }
}

class Controller {
    cells: Map<string, Cell>;
    board: GameBoard;

    private command: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    private randomNumber(upper: number, lower: number):number {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

    private fakeCommand(): string {
        var num = this.randomNumber(7, 0);

        return this.command[num];
    }

    private endGame(): boolean {
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
    }

    private resetGame() {
        this.cells.get("a1").updateTeam("red");
        this.cells.get("a2").updateTeam("green");
        this.cells.get("b1").updateTeam("green");
        this.cells.get("b2").updateTeam("blue");

        this.cells.get("a1").updateTroops(10);
        this.cells.get("a2").updateTroops(10);
        this.cells.get("b1").updateTroops(10);
        this.cells.get("b2").updateTroops(10);

        this.board = new GameBoard(this.cells);
    }

    private preformAttack(attacker: Cell, defender: Cell): boolean {
        var success: boolean;
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
        }
        return success;
    }

    private actionEvent(event: string) {
        var attacker: Cell;
        var defender: Cell;

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
        } else { // Else do the first
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
    }


    constructor() {
        this.cells = new Map<string, Cell>();
        this.cells.set("a1", new Cell("a1", "red", 10));
        this.cells.set("a2", new Cell("a2", "green", 10));
        this.cells.set("b1", new Cell("b1", "green", 10));
        this.cells.set("b2", new Cell("b2", "blue", 10));

        this.board = new GameBoard(this.cells);

        //Make a twitch object that can return the command to be executed (will be called in action())
    }

    action() {
        if (!this.endGame()) {
            this.actionEvent(this.fakeCommand());
        } else {
            this.board.gameStats();
            this.resetGame();
        }
    }
}

window.onload = function () {
    var ctl = new Controller();
    //ctl.attack(ctl.a2, ctl.a1);
    while (ctl.endGame()) {
        setTimeout(function () { ctl.action() }, 2000);
    }
}


