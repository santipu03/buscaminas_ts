"use strict";
var Casella = /** @class */ (function () {
    function Casella(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.minesAdjacent = 0;
    }
    Casella.prototype.setMinesAdjacent = function (mines) {
        this.minesAdjacent = mines;
    };
    return Casella;
}());
