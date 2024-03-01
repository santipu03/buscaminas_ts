"use strict";
var Joc = /** @class */ (function () {
    function Joc(files, columnes) {
        this.tauler = new Tauler(files, columnes);
        this.dibuixarTauler();
    }
    Joc.prototype.dibuixarTauler = function (perdut) {
        var _this = this;
        if (perdut === void 0) { perdut = false; }
        var tauler = document.getElementById('tauler');
        if (!tauler) {
            return;
        }
        // Recorre totes les caselles del tauler i les dibuixa segons el seu estat 
        // Els estats son: revelada, marcada, esMina i minesAdjacent
        tauler.innerHTML = '';
        var _loop_1 = function (i) {
            var fila = document.createElement('div');
            fila.className = 'fila';
            var _loop_2 = function (j) {
                var casella = document.createElement('div');
                casella.className = 'casella';
                var c = this_1.tauler.caselles[i][j];
                // Aqui definim les classes que volem afegir a cada casella segons el seu estat
                if (c.revelada) {
                    casella.classList.add('revelada');
                    if (c.esMina) {
                        casella.classList.add('mina');
                    }
                    else {
                        casella.classList.add('num' + c.minesAdjacent);
                    }
                }
                else if (c.marcada) {
                    casella.classList.add('marcada');
                }
                // Si la casella no està marcada ni revelada, afegim els event listeners
                // Si l'usuari fa clic, revel·lem la casella
                casella.onclick = function () { return _this.revelarCasella(i, j); };
                // Si l'usuari fa clic amb el botó dret, marquem la casella com a sospitosa de contenir una mina
                casella.oncontextmenu = function (e) {
                    e.preventDefault();
                    _this.marcarCasella(i, j);
                };
                // Afegim la casella a la fila
                fila.appendChild(casella);
            };
            for (var j = 0; j < this_1.tauler.columnes; j++) {
                _loop_2(j);
            }
            // Afegim la fila al tauler
            tauler.appendChild(fila);
        };
        var this_1 = this;
        for (var i = 0; i < this.tauler.files; i++) {
            _loop_1(i);
        }
        // Comprovem si l'usuari ha guanyat
        var guanyat = true;
        for (var i = 0; i < this.tauler.files; i++) {
            for (var j = 0; j < this.tauler.columnes; j++) {
                var c = this.tauler.caselles[i][j];
                // Si totes les cases que contenen mines estan marcades, l'usuari ha guanyat
                if (!c.marcada && c.esMina) {
                    guanyat = false;
                }
            }
        }
        if (guanyat) {
            alert('Has guanyat!');
        }
        // Si l'usuari ha perdut, mostrem totes les mines
        if (perdut) {
            for (var i = 0; i < this.tauler.files; i++) {
                for (var j = 0; j < this.tauler.columnes; j++) {
                    var c = this.tauler.caselles[i][j];
                    if (c.esMina) {
                        c.revelada = true;
                    }
                }
            }
            this.dibuixarTauler();
            // Esperem 10ms perquè el tauler s'actualitzi amb les mines abans de mostrar l'alerta
            setTimeout(function () { return alert('Has perdut!'); }, 100);
        }
    };
    Joc.prototype.revelarCasella = function (fila, columna) {
        var c = this.tauler.caselles[fila][columna];
        if (!c) {
            return;
        }
        if (c.marcada || c.revelada) {
            return;
        }
        c.revelada = true;
        var perdut = false;
        // Si la casella conté una mina, el joc s'acaba
        if (c.esMina) {
            perdut = true;
        }
        // Si la casella no conté mines adjacents, obrim les caselles adjacents
        if (c.minesAdjacent === 0) {
            this.obrirCasellesAdjacents(fila, columna);
        }
        this.dibuixarTauler(perdut);
    };
    Joc.prototype.marcarCasella = function (fila, columna) {
        var c = this.tauler.caselles[fila][columna];
        if (c.revelada) {
            return;
        }
        c.marcada = !c.marcada;
        this.dibuixarTauler();
    };
    Joc.prototype.obrirCasellesAdjacents = function (fila, columna) {
        // Obrim les caselles adjacents a la casella [fila, columna]
        for (var x = fila - 1; x <= fila + 1; x++) {
            for (var y = columna - 1; y <= columna + 1; y++) {
                // Comprovem que la casella estigui dins del tauler
                if (x >= 0 && x < this.tauler.files && y >= 0 && y < this.tauler.columnes) {
                    this.revelarCasella(x, y);
                }
            }
        }
        // Es el mateix que fer això (pero comprovant que les caselles estiguin dins del tauler):
        // this.revelarCasella(fila + 1, columna + 1);
        // this.revelarCasella(fila + 1, columna);
        // this.revelarCasella(fila + 1, columna - 1);
        // this.revelarCasella(fila, columna + 1);
        // this.revelarCasella(fila, columna - 1);
        // this.revelarCasella(fila - 1, columna + 1);
        // this.revelarCasella(fila - 1, columna);
        // this.revelarCasella(fila - 1, columna - 1);
    };
    return Joc;
}());
