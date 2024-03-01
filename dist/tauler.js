"use strict";
var Tauler = /** @class */ (function () {
    function Tauler(files, columnes) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.inicialitzarCaselles();
    }
    Tauler.prototype.inicialitzarCaselles = function () {
        // Inicialitzem les caselles del tauler i assignem mines aleatòriament
        for (var i = 0; i < this.files; i++) {
            this.caselles[i] = [];
            for (var j = 0; j < this.columnes; j++) {
                var esMina = Math.random() < 0.2;
                this.caselles[i][j] = new Casella(esMina);
            }
        }
        // Calculem el nombre de mines adjacents per a cada casella
        for (var i = 0; i < this.files; i++) {
            for (var j = 0; j < this.columnes; j++) {
                var mines = 0;
                // Aquests dos bucles recorren les 8 caselles adjacents a la casella [i, j]
                for (var x = i - 1; x <= i + 1; x++) {
                    for (var y = j - 1; y <= j + 1; y++) {
                        // Comprovem que la casella estigui dins del tauler
                        if (x >= 0 && x < this.files && y >= 0 && y < this.columnes) {
                            // Comprovem si la casella adjacente conté una mina
                            if (this.caselles[x][y].esMina) {
                                mines++;
                            }
                        }
                    }
                }
                // Guardem el nombre de mines adjacents a la casella
                this.caselles[i][j].setMinesAdjacent(mines);
            }
        }
    };
    return Tauler;
}());
