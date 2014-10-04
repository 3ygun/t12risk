﻿interface CellStatic {
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

class Control {
    a1;

    constructor() {
        var cs: CellStatic = Cell;
        this.a1 = cs({ name: "a1", team: "red", troops: 10 });
        var a2 = cs({ name: "a2", team: "red", troops: 10 });
        var b1 = cs({ name: "b1", team: "blue", troops: 10 });
        var b2 = cs({ name: "b2", team: "blue", troops: 10 });
    }

    attack(attacker: Cell, defender: Cell) {
        //defender.troops = 0;
        defender.team = attacker.team;
    }
}

class GameBoard {
    
}

var c = new Control();
console.log(c.a1);


