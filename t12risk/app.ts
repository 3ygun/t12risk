interface CellStatic {
    new (name: string, team: string, troops: number);
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

    constructor(cell1: HTMLElement, cell2: HTMLElement, cell3: HTMLElement, cell4: HTMLElement) {
        this.a1 = cell1;
        this.a2 = cell2;
        this.b1 = cell3;
        this.b2 = cell4;
    }


}

class Controller {
    a1;
    a2;
    b1;
    b2;
    board;

    constructor() {
        var cs: CellStatic = Cell;
        this.a1 = cs({ name: "a1", team: "red", troops: 10 });
        this.a2 = cs({ name: "a2", team: "red", troops: 10 });
        this.b1 = cs({ name: "b1", team: "blue", troops: 10 });
        this.b2 = cs({ name: "b2", team: "blue", troops: 10 });

        var cell_1 = document.getElementById('a1');
        var cell_2 = document.getElementById('a2');
        var cell_3 = document.getElementById('b1');
        var cell_4 = document.getElementById('b2');

        this.board = new GameBoard(cell_1, cell_2, cell_3, cell_4);
    }

    attack(attacker: Cell, defender: Cell) {
        //defender.troops = 0;
        defender.team = attacker.team;
    }
}

window.onload = function () {
    new Controller();
}


