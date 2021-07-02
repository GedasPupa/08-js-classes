"use strict";

class Namas {
    constructor(miestas, data, adresas) {
        this.miestas = miestas;
        this.data = data;
        this.adresas = adresas;
        this.laiptines = [];
        this.butuSkaicius = [];
        this.butai = [];
    }

    pastatykLaiptines(a, b) {
        for (let i=1; i<=randNumber(a, b); i++) {
            this.laiptines.push(i);
        }
    }
    pastatykButus(a, b) {
        for (let i=0; i<this.laiptines.length; i++) {
            this.butuSkaicius.push(randNumber(a, b));
        }
    }
    visoButu() {
        const viso = this.butuSkaicius.reduce((acc, qurr) => acc+qurr);
        return viso;
    }
    apgyvendink() {
        for (let i=1; i<=this.visoButu(); i++) {
            this.butai.push(new Butas(i, randNumber(1,4), randNumber(2,9)));
        }
    }
}

class Butas {
    constructor(num, ksk, gsk) {
        this.numeris = num;
        this.kambariuSkaicius =  ksk;
        this.gyventojuSkaicius = gsk;
    }
    info() {
        return `Bute nr.: ${this.numeris} gyvena ${this.gyventojuSkaicius} galvos. Ir jos puikiai telpa: ${this.kambariuSkaicius}${this.kambariuSkaicius == 1 ? ' kambaryje!!!' : ' kambariuose!!!'}`;
    }
}

let date = new Date().toLocaleDateString();

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const n1 = new Namas('Vilnius', date, 'Čia stovės namas!');
const n2 = new Namas('Kaunas', date, 'Kauno 11');


n2.pastatykLaiptines(3,5);
n2.pastatykButus(10, 12);
n2.apgyvendink();

// console.log(n1.visoButu());
// console.log(n2.visoButu());
// console.log(n1.butai);
// console.log(n1.laiptines);
// for (let i=0; i<n1.butai.length; i++) {
//     console.log(n1.butai[i].info() + ` [adresas: ${n1.adresas}, ${n1.miestas}]`);
// }

const main = document.createElement('div');
main.id = 'main';
main.style.width = '80%';
main.style.display = 'flex';
main.style.margin = '50px auto';
main.style.flexDirection = 'column';
document.body.appendChild(main);

const namas = document.createElement('div');
namas.id = 'namas';
namas.innerText = n1.adresas;

const input = document.createElement('input');
input.id = 'input';
input.placeholder = 'Įvesk sklypo adresą...';
input.style.width = '250px';


const button = document.createElement('button');
button.id = 'button';
button.innerText = 'STATYK NAMĄ!';
button.style.width = '150px';
button.style.margin = '10px 0';

const gyventojai = document.createElement('button');
gyventojai.id = 'gyventojai';
gyventojai.innerText = 'APGYVENDINK!';
gyventojai.style.width = '150px';

const par = document.createElement('p');

main.appendChild(input);
main.appendChild(button);
main.appendChild(gyventojai);
main.appendChild(namas);
main.appendChild(par);


document.getElementById('button').addEventListener('click', statyk);
document.getElementById('gyventojai').addEventListener('click', apgyvendink);

function statyk() {
    const inputas = document.getElementById('input').value;
    n1.adresas = inputas;
    n1.laiptines = [];
    n1.butuSkaicius = [];
    n1.butai = [];
    namas.innerHTML = n1.adresas;
    n1.pastatykLaiptines(3,8);
    n1.pastatykButus(3,5);
    n1.apgyvendink();
    let count = 1;
    for (let i=1; i<=n1.laiptines.length; i++) {
        const laiptine = document.createElement('div');
        laiptine.classList.add(`laiptine`);
        namas.appendChild(laiptine);
        for (let j=n1.butuSkaicius[i-1]; j>0; j--) {
            const butas = document.createElement('div');
            butas.classList.add('butas');
            butas.innerText = count;
            laiptine.appendChild(butas);
            count++;
        }
    }
    console.log(n1.visoButu());
    console.log(n1.laiptines);
}

function apgyvendink() {
    par.innerText = '';
    if (n1.laiptines.length == 0) {
        par.innerText = 'Pradžiai pastatyk namą, tada apsigyvensime!';
        main.appendChild(par);
        return;
    }
    for (let i=0; i<n1.butai.length; i++) {
        par.innerText += n1.butai[i].info();
    }
}




