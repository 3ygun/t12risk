﻿interface CellStatic {
    new (name: string, team: string, troops: number);
}

class Cell {
    constructor(name: string, team: string, troops: number) { }
}

class Control {
     constructor() {
        var cs: CellStatic = Cell;
        var a1 = cs({ name: "a1", team: "red", troops: 10 });
        var a2 = cs({ name: "a2", team: "red", troops: 10 });
        var b1 = cs({ name: "b1", team: "blue", troops: 10 });
        var b2 = cs({ name: "b2", team: "blue", troops: 10 });
     }
}




