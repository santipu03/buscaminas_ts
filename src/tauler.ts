class Tauler {
    caselles: Casella[][];
    files: number;
    columnes: number;

    constructor(files: number, columnes: number) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.inicialitzarCaselles();
    }

    inicialitzarCaselles() {
        // Inicialitzem les caselles del tauler i assignem mines aleatòriament
        for (let i = 0; i < this.files; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < this.columnes; j++) {
                const esMina = Math.random() < 0.2;
                this.caselles[i][j] = new Casella(esMina);
            }
        }

        // Calculem el nombre de mines adjacents per a cada casella
        for (let i = 0; i < this.files; i++) {
            for (let j = 0; j < this.columnes; j++) {
                let mines = 0;
                // Aquests dos bucles recorren les 8 caselles adjacents a la casella [i, j]
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
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
    }
}