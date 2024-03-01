class Joc {
    tauler: Tauler;

    constructor(files: number, columnes: number) {
        this.tauler = new Tauler(files, columnes);
        this.dibuixarTauler();
    }

    dibuixarTauler(perdut: boolean = false) {
        const tauler = document.getElementById('tauler');

        if (!tauler) {
            return;
        }

        // Recorre totes les caselles del tauler i les dibuixa segons el seu estat 
        // Els estats son: revelada, marcada, esMina i minesAdjacent
        tauler.innerHTML = '';
        for (let i = 0; i < this.tauler.files; i++) {
            const fila = document.createElement('div');
            fila.className = 'fila';
            for (let j = 0; j < this.tauler.columnes; j++) {
                const casella = document.createElement('div');
                casella.className = 'casella';
                const c = this.tauler.caselles[i][j];
                // Aqui definim les classes que volem afegir a cada casella segons el seu estat
                if (c.revelada) {
                    casella.classList.add('revelada');
                    if (c.esMina) {
                        casella.classList.add('mina');
                    } else {
                        casella.classList.add('num' + c.minesAdjacent);
                    }
                } else if (c.marcada) {
                    casella.classList.add('marcada');
                }
                // Si la casella no està marcada ni revelada, afegim els event listeners
                // Si l'usuari fa clic, revel·lem la casella
                casella.onclick = () => this.revelarCasella(i, j);
                // Si l'usuari fa clic amb el botó dret, marquem la casella com a sospitosa de contenir una mina
                casella.oncontextmenu = (e) => {
                    e.preventDefault();
                    this.marcarCasella(i, j);
                };
                // Afegim la casella a la fila
                fila.appendChild(casella);
            }
            // Afegim la fila al tauler
            tauler.appendChild(fila);
        }

        // Comprovem si l'usuari ha guanyat
        let guanyat = true;
        for (let i = 0; i < this.tauler.files; i++) {
            for (let j = 0; j < this.tauler.columnes; j++) {
                const c = this.tauler.caselles[i][j];
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
            for (let i = 0; i < this.tauler.files; i++) {
                for (let j = 0; j < this.tauler.columnes; j++) {
                    const c = this.tauler.caselles[i][j];
                    if (c.esMina) {
                        c.revelada = true;
                    }
                }
            }
            this.dibuixarTauler();
            // Esperem 10ms perquè el tauler s'actualitzi amb les mines abans de mostrar l'alerta
            setTimeout(() => alert('Has perdut!'), 500);
        }
    }

    revelarCasella(fila: number, columna: number) {
        const c = this.tauler.caselles[fila][columna];
        if(!c) {
            return;
        }
        if (c.marcada || c.revelada) {
            return;
        }
        c.revelada = true;
        let perdut = false;

        // Si la casella conté una mina, el joc s'acaba
        if (c.esMina) {
            perdut = true;
        }

        // Si la casella no conté mines adjacents, obrim les caselles adjacents
        if (c.minesAdjacent === 0) {
            this.obrirCasellesAdjacents(fila, columna);
        }
        
        this.dibuixarTauler(perdut);
    }

    marcarCasella(fila: number, columna: number) {
        const c = this.tauler.caselles[fila][columna];
        if (c.revelada) {
            return;
        }
        c.marcada = !c.marcada;
        this.dibuixarTauler();
    }

    obrirCasellesAdjacents(fila: number, columna: number) {
        // Obrim les caselles adjacents a la casella [fila, columna]
        for (let x = fila - 1; x <= fila + 1; x++) {
            for (let y = columna - 1; y <= columna + 1; y++) {
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
    }
}