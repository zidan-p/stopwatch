let detik = 0;
let menit = 0;
let jam = 0;
let ms = 0;
let jarum_detik = document.querySelector(".gerak_detik");
let jarum_menit = document.querySelector(".gerak_menit");

//membuat interval untuk jarum jam dan angka digital
let deg_jarum;
deg_jarum = setInterval(gerak, 1000);
let angka_digital;
angka_digital = setInterval(dig_angka, 100);

//gerak untuk menit dan detik
function gerak(){
    jarum_detik.style.transform = `rotate(${detik * 6}deg)`;
    jarum_menit.style.transform = `rotate(${menit * 6}deg)`;
    detik++;
    if(detik % 60 == 0 && detik > 60){
        menit++;
    };
    if(menit % 60 == 0 && menit > 60){
        jam++;
    }
}

//untuk angka digital
let angka_dig = document.querySelector(".waktu h2");
function dig_angka(){
    angka_dig.innerHTML = `${zf(jam)}.${zf(menit%60)}.${zf(detik%60)}.${ms%10}`;
    ms++;
}

//fungsi untuk membuat ada 0 didepan (zero_format)
function zf(numb){
    let num = numb.toString();
    switch (num.length) {
        case 0:
            return "00";
            break;
        case 1:
            return "0"+num;
            break;
        case 2:
            return num;
            break
        default:
        break;
    }
    return "error";
}

//untuk tombol berhenti dan lanjut (mirip menggunakan toggle)
let henti = document.querySelector(".stop");
henti.addEventListener('click',() => {
    if(deg_jarum){
        //untuk interval jarum jam
        clearInterval(deg_jarum);
        deg_jarum = null;

        //untuk interval jam digital
        clearInterval(angka_digital);
        angka_digital = null;
        henti.innerHTML = `<i class="bi bi-play-circle-fill"></i> Play`;
    }
    else if(deg_jarum == null){
        angka_digital = setInterval(dig_angka, 100);
        deg_jarum = setInterval(gerak, 1000);
        henti.innerHTML = `<i class="bi bi-stop-circle-fill"></i> Stop`;
    }
});

//untuk tombol reset ditekan
let reset = document.querySelector(".reset");
reset.addEventListener('click', () => {
    detik = 0;
    menit = 0;
    jam = 0;
    ms = 0;
    angka_dig.innerHTML = `00.00.00.0`;
    jarum_detik.style.transform = `rotate(0deg)`;
    jarum_menit.style.transform = `rotate(0deg)`;
    document.querySelector('.waktu-flag').innerHTML = "";
});

//untuk tombol flag ditekan
let flag = document.querySelector(".flag");
flag.addEventListener('click',()=>{
    let par = document.createElement('p');
    let hah = document.createTextNode(`${zf(jam)}.${zf(menit%60)}.${zf(detik%60)}.${ms%10}`);
    par.appendChild(hah);
    document.querySelector('.waktu-flag').prepend(par);
});