interface CellStatic {
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

        return element;
    }

    constructor(cell1: HTMLElement, cell2: HTMLElement, cell3: HTMLElement, cell4: HTMLElement, cell1tnum: HTMLElement, cell2tnum: HTMLElement, cell3tnum: HTMLElement, cell4tnum: HTMLElement) {
        this.a1 = cell1;
        this.a2 = cell2;
        this.b1 = cell3;
        this.b2 = cell4;

        this.a1tnum = cell1tnum;
        this.a2tnum = cell2tnum;
        this.b1tnum = cell3tnum;
        this.b2tnum = cell4tnum;
    }

    changeColor(idName: string, color: string) {
        this.getHTMLElement(idName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    }

    changeTroops(idName: string, troops: number) {
        this.getHTMLElement(idName).innerHTML = "" + troops;
    }
}

class Controller {
    a1: Cell;
    a2: Cell;
    b1: Cell;
    b2: Cell;
    board: GameBoard;

    private command: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    private randomNumber(upper: number, lower: number):number {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

    private fakeCommand(): string {
        var num = this.randomNumber(7, 0);

        return this.command[num];
    }

    private preformAttack(attacker: Cell, defender: Cell): string {
        var winner: string;
        while (attacker.troops() > 1 && defender.troops() > 0) {
            var attackerRoll = this.randomNumber(6, 1);
            var defenderRoll = this.randomNumber(6, 1);

            if (defenderRoll >= attackerRoll) {
                attacker.updateTroops(attacker.troops() - 1);
                winner = defender.team();
            } else {
                defender.updateTroops(defender.troops() - 1);
                winner = attacker.team();
            }
        }

        this.board.changeColor(defender.name(), defender.team());

        return winner;
    }



    constructor() {
        this.a1 = new Cell("a1", "red", 10);
        this.a2 = new Cell("a2", "yellow", 10);
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

    action() {
        setInterval(this.actionEvent(this.fakeCommand()), 30000);
    }

    
}

window.onload = function () {
    var ctl = new Controller();
    //ctl.attack(ctl.a2, ctl.a1);
    ctl.action();
}


