function attack(attacker, defender) {
    defender.troops = 0;
    defender.team = attacker.team;
}

var a1 = { name: "a1", team: "Red", troops: 10 };
var a2 = { name: "a2", team: "Blue", troops: 10 };
var b1 = { name: "b1", team: "Red", troops: 10 };
var b2 = { name: "b2", team: "Blue", troops: 10 };

console.log(a1.troops + " " + a2.troops + " " + b1.troops + " " + b2.troops);

attack(a1, b2);

console.log(a1.troops + " " + a2.troops + " " + b1.troops + " " + b2.troops);
//class Greeter {
//    element: HTMLElement;
//    span: HTMLElement;
//    timerToken: number;
//    constructor(element: HTMLElement) {
//        this.element = element;
//        this.element.innerHTML += "The time is: ";
//        this.span = document.createElement('span');
//        this.element.appendChild(this.span);
//        this.span.innerText = new Date().toUTCString();
//    }
//    start() {
//        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
//    }
//    stop() {
//        clearTimeout(this.timerToken);
//    }
//}
//window.onload = () => {
//    var el = document.getElementById('content');
//    var greeter = new Greeter(el);
//    greeter.start();
//};
//# sourceMappingURL=app.js.map
