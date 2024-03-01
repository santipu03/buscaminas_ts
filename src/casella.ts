class Casella {
    esMina: boolean;        // true si la casella conté una mina
    revelada: boolean;      // true si la casella ha estat revelada per l'usuari    
    marcada: boolean;       // true si la casella ha estat marcada com a sospitosa de contenir una mina per l'usuari
    minesAdjacent: number;  // nombre de mines adjacents a la casella

    constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.minesAdjacent = 0;
    }

    setMinesAdjacent(mines: number) {
        this.minesAdjacent = mines;
    }
}