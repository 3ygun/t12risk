function attack(attacker, defender) {
    defender.troops = 0;
    defender.team = attacker.team;
}

/*
*  Method that makes a cell!
*/
function createCell(propertiesCell) {
    name:
    propertiesCell.name;
    team:
    propertiesCell.team;
    troops:
    propertiesCell.troops;
}

var a1 = createCell({ name: "a1", team: "red", troops: 10 });
var a2 = createCell({ name: "a2", team: "red", troops: 10 });
var b1 = createCell({ name: "b1", team: "blue", troops: 10 });
var b2 = createCell({ name: "b2", team: "blue", troops: 10 });
//# sourceMappingURL=app.js.map
