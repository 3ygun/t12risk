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

    updateCell(team: string, troops: number) {
        this.teamVal = team;
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

    private getHTMLElement(cellName: string):HTMLElement {
        var element: HTMLElement;

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
    }

    constructor(cell1: HTMLElement, cell2: HTMLElement, cell3: HTMLElement, cell4: HTMLElement) {
        this.a1 = cell1;
        this.a2 = cell2;
        this.b1 = cell3;
        this.b2 = cell4;
    }

    changeColor(cellName:string, color:string) {
        this.getHTMLElement(cellName).style.backgroundColor = color;
        //this.a1.innerHTML = "<h1>Did it work?</h1>";
    }
}

class Controller {
    a1:Cell;
    a2:Cell;
    b1:Cell;
    b2:Cell;
    board: GameBoard;

    private command: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    private randomNumber(upper: number, lower: number):number {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

    private fakeCommand(): string {
        var num = this.randomNumber(7, 0);

        return this.command[num];
    }

    private actionEvent(event: string) {
        this.board.changeColor("a1", "pink")
    }

    constructor() {
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

    action() {
        setInterval(this.actionEvent(this.fakeCommand()), 3000);
    }

    attack(attacker: Cell, defender: Cell) {
        defender.updateCell(attacker.team(), attacker.troops()-1);
        this.board.changeColor(defender.name(), defender.team());        
    }
}

window.onload = function () {
    var ctl = new Controller();
    ctl.attack(ctl.a2, ctl.a1);
    ctl.action();
}


