var karty = [];

karty[0] = "02_Trefl";
karty[1] = "03_Trefl";
karty[2] = "04_Trefl";
karty[3] = "05_Trefl";
karty[4] = "06_Trefl";
karty[5] = "07_Trefl";
karty[6] = "08_Trefl";
karty[7] = "09_Trefl";
karty[8] = "10_Trefl";
karty[9] = "0J_Trefl";
karty[10] = "0Q_Trefl";
karty[11] = "0K_Trefl";
karty[12] = "0A_Trefl";
karty[13] = "02_Pik";
karty[14] = "03_Pik";
karty[15] = "04_Pik";
karty[16] = "05_Pik";
karty[17] = "06_Pik";
karty[18] = "07_Pik";
karty[19] = "08_Pik";
karty[20] = "09_Pik";
karty[21] = "10_Pik";
karty[22] = "0J_Pik";
karty[23] = "0Q_Pik";
karty[24] = "0K_Pik";
karty[25] = "0A_Pik";
karty[26] = "02_Kier";
karty[27] = "03_Kier";
karty[28] = "04_Kier";
karty[29] = "05_Kier";
karty[30] = "06_Kier";
karty[31] = "07_Kier";
karty[32] = "08_Kier";
karty[33] = "09_Kier";
karty[34] = "10_Kier";
karty[35] = "0J_Kier";
karty[36] = "0Q_Kier";
karty[37] = "0K_Kier";
karty[38] = "0A_Kier";
karty[39] = "02_Karo";
karty[40] = "03_Karo";
karty[41] = "04_Karo";
karty[42] = "05_Karo";
karty[43] = "06_Karo";
karty[44] = "07_Karo";
karty[45] = "08_Karo";
karty[46] = "09_Karo";
karty[47] = "10_Karo";
karty[48] = "0J_Karo";
karty[49] = "0Q_Karo";
karty[50] = "0K_Karo";
karty[51] = "0A_Karo";

var kartyImg = [];
for(let i=0; i<karty.length;i++){
    let img = document.createElement("img");
    img.setAttribute("alt", karty[i]);
    img.setAttribute("src", 'img/cards/'+karty[i]+'.png');
    kartyImg.push(img);
}

//--------------------Stosy kart--------------------
var zakryte = [];
var odkryte = [];

//---------------Karty gracz----------------------------------------------------------
var bot1Cards = document.querySelector("#cardsBot1");
var bot2Cards = document.querySelector("#cardsBot2");
var bot3Cards = document.querySelector("#cardsBot3");
var youCards = document.querySelector(".cardsYou");

//----Obsługa ilości kart do pobrania-----------------------------------------------
var sumaSpan = document.querySelector(".centerBoard span");
var suma = 0;

//-----Ostania karta jaka została zagrana--------------------------------------
var kartaNaWidoku = document.querySelector("#odkryte");
var imgDobieranieKart = document.querySelector("#zakryte");

//-----------Czyj ruch----------------------------------
var ktoTerazGra = document.getElementById("ktoTeraz");

//------------------Obsługa urchomienia i ponowienia gry----------------------------------------------
var nowaGra = document.querySelector(".buttons input");
nowaGra.addEventListener("click", start);

//-------------------------Start gry----------------------------
function start(){
    nowaGra.setAttribute("value", "Od nowa");

    document.getElementById("zakryte").addEventListener("click", dobierzKarteZZakrytych);

    ktoTerazGra.innerText="Ty";
    
    sumaSpan.innerText = "";

    resetGry();
    document.getElementById("ktoWygral").innerText=""; 

    imgDobieranieKart.classList.add("zakryte");

    losujKarty(karty);
    
    for(let i=0; i<20;i++){
        let img = stworzKatre(zakryte[i]);

        if(i%4==0) youCards.appendChild(img);
        if(i%4==1){
            img.setAttribute("src", 'img/cards/background_card.png');
            bot1Cards.appendChild(img);
        } 
        if(i%4==2){
            img.setAttribute("src", 'img/cards/background_card.png');
            bot2Cards.appendChild(img);
        } 
        if(i%4==3){
            img.setAttribute("src", 'img/cards/background_card.png');
            bot3Cards.appendChild(img);
        } 
    }
    zakryte.splice(0,20);
    
    odkryte.push(zakryte[0]);
    zakryte.splice(0,1);

    let znak = odkryte[0].substring(0,2);
    if(znak=="02" || znak=="03" || znak=="0J" || znak=="0Q" || znak=="0K" || znak=="0A") start();

    kartaNaWidoku.setAttribute("src", "img/cards/"+odkryte[0]+".png");
    kartaNaWidoku.setAttribute("alt", odkryte[0]);

    for(card of youCards.children) card.addEventListener("click", wybranieKarty);
}

//-------------Dodowanie karty dal grasza po kliknięciu zakryte--------------------
function dobierzKarteZZakrytych(){
    console.log(ktoTerazGra.innerText);
    if(ktoTerazGra.innerText=="Ty"){
        for(let i=1;i<suma;i++) dobierzKarte("Ty");
        dobierzKarte("Ty");

        suma = 0;
        sumaSpan.innerText = "";

        ktoTerazGra.innerText="GRACZ 1";
        setTimeout("bot()", 5000);
    }
    else alert("Nie twój ruch nie możesz brać karty");
}

//----------------Stwozrenie kart-----------------------------
function stworzKatre(card){
    let img = document.createElement("img");
    if (ktoTerazGra.innerText=="Ty") img.setAttribute("src", 'img/cards/'+card+'.png');
    else img.setAttribute("src", 'img/cards/background_card.png');
    img.setAttribute("alt", card);
    return img;
}

//-----------Dodawanie karty dla grasza------------------
function dobierzKarte(kto){
    let img = stworzKatre(zakryte[0]);
    
    img.style.opacity = 0;
    //img.classList.add("addCard");

    if(kto=="Ty" && ktoTerazGra.innerText=="Ty"){
        img.addEventListener("click", wybranieKarty);
        /*setTimeout(function(){youCards.appendChild(img);}, 500);*/ youCards.appendChild(img);
    }
    if(kto=="GRACZ 1")  /*setTimeout(function(){bot1Cards.appendChild(img);}, 500);*/ bot1Cards.appendChild(img);
    if(kto=="GRACZ 2")  /*setTimeout(function(){bot2Cards.appendChild(img);}, 500);*/ bot2Cards.appendChild(img);
    if(kto=="GRACZ 3")  /*setTimeout(function(){bot3Cards.appendChild(img);}, 500);*/ bot3Cards.appendChild(img);
    
    setTimeout(function(){img.classList.add("addCard");}, 500)
    //img.classList.add("addCard");
    //img.classList.remove("addCard");
    zakryte.splice(0,1);
    sprawdzZakryte();
}

//-------------------------dodwanie kart do gry jeśli branie na stosie-------------
function sprawdzZakryte(){
    if(zakryte.length==0){
        losujKarty(odkryte);
        odkryte.splice(0, odkryte.length-1);
        zakryte.splice(zakryte.indexOf(odkryte[0]), 1);
    }
}

//--------tasowanie kart------------------------------------
function losujKarty(taliDoTasowaniem) {
    let n=taliDoTasowaniem.length;
    let k=n;
    let numbers = new Array(n);

    for (let i=0; i<n; i++) {
        numbers[i] = i + 1;
    }

    for (let i=0; i<k; i++) {
        let r = Math.floor(Math.random()*n);

        zakryte[i]=taliDoTasowaniem[numbers[r]-1];
        
        numbers[r] = numbers[n - 1];
        n--;
    }
}

//---------------------------Funkacja wyłołana po wybraniu karty-----------------------------
function wybranieKarty(){ 
    let wybranaKarta = this.getAttribute('alt');
   
    if(ktoTerazGra.innerText=="Ty" && sprawdzeniaKarty(wybranaKarta)){
        odkryte.push(wybranaKarta);

        kartaNaWidoku.setAttribute("src", "img/cards/"+wybranaKarta+".png");
        kartaNaWidoku.setAttribute("alt", wybranaKarta);
        
        this.classList.add("removeCard");
        let card = this;
        setTimeout(function(){card.remove();}, 500);
        
        
        if(sprawdzWygrana(youCards.children, "Ty")){
            ktoTerazGra.innerText="GRACZ 1";
            setTimeout("bot()", 5000);
        }
    }
    else if(ktoTerazGra.innerText!="Ty") alert("Nie twój ruch");
    else alert("Tą kartą nie można zagrać");
}

//-------------------------Obsługa boty----------------------------
function bot(){
    let kto = ktoTerazGra.innerText;

    if(kto=="GRACZ 1"){
        ruchBota(bot1Cards.children);

        if(sprawdzWygrana(bot1Cards.children, "GRACZ 1")){
            ktoTerazGra.innerText="GRACZ 2";
            setTimeout("bot()", 5000);
        }
    }

    if(kto=="GRACZ 2"){
        ruchBota(bot2Cards.children);
  
        if(sprawdzWygrana(bot2Cards.children, "GRACZ 2")){
            ktoTerazGra.innerText="GRACZ 3";
            setTimeout("bot()", 5000);
        }
    }

    if(kto=="GRACZ 3"){
        ruchBota(bot3Cards.children);

        if(sprawdzWygrana(bot3Cards.children, "GRACZ 3")) ktoTerazGra.innerText="Ty";
    }
}

//--------------------------------Ruch bota-------------------------------------
function ruchBota(cards){
    let zagranaKarta;
    let jestKarta=false;
    for(card of cards){
        if(sprawdzeniaKarty(card.getAttribute("alt"))){
            jestKarta = true;
            zagranaKarta = card;
            break;
        }
    };

    zmienKarte(jestKarta, zagranaKarta);
}

//---------------------------Ustawienie katy na stos która zosała zagrana--------------------
function zmienKarte(jestKarta, zagranaKarta){
    if(jestKarta){
        kartaNaWidoku.setAttribute("src", kartyImg[karty.indexOf(zagranaKarta.getAttribute('alt'))].getAttribute("src"));
        kartaNaWidoku.setAttribute("alt", zagranaKarta.getAttribute("alt"));
        odkryte.push(zagranaKarta.getAttribute("alt"));

        zagranaKarta.classList.add("removeCard");
        setTimeout(function(){zagranaKarta.remove();}, 500);
    }
    else{
        for(let i=1;i<suma;i++) dobierzKarte(ktoTerazGra.innerText);
        dobierzKarte(ktoTerazGra.innerText); 
        suma=0;
        sumaSpan.innerText="";
    }
}

//-------------------Sprzwdzenie czy tą katę moża zagrać----------------
function sprawdzeniaKarty(wybranaKarta){
    let kartaPod = kartaNaWidoku.getAttribute("alt");
    
    let wybranaKartaZnak = wybranaKarta.substring(0,2);
    let wybranaKartaFigura = wybranaKarta.substring(3, wybranaKarta.length);
    let kartaPodZnak = kartaPod.substring(0,2);
    let kartaPodFigura = kartaPod.substring(3, kartaPod.length);
    
    if((wybranaKartaZnak==kartaPodZnak || wybranaKartaFigura==kartaPodFigura)){
        switch(wybranaKartaZnak){
            case "02":
                suma+=2;
                sumaSpan.innerText=suma;
                break
            case "03":
                suma+=3;
                sumaSpan.innerText=suma;
                break
            case "0Q":
                suma=0;
                sumaSpan.innerText="";
                break;
            case "0J":
                if(suma<=5){
                    suma=0;
                    sumaSpan.innerText="";
                }
                else{
                    suma-=5;
                    sumaSpan.innerText=suma;
                }
                break;
            case "0K":
                suma+=5;
                sumaSpan.innerText=suma;
                break;
            case "0A":
                break;
            default:
                if(suma==0) return true;
                else return false;
        }
        return true;
    }
    else return false;
}

//--------------Sprawdzenie czy ktoś wygrał------------
function sprawdzWygrana(cards, kto){
    if(cards.length==0){
        setTimeout("wygrana('"+kto+"')", 2000);
        return false;
    }
    return true;
}

//-------------------Co ma się stać jeśli ktoś wygrał-----------------------------
function wygrana(kto){
    document.getElementById("ktoWygral").innerText="Wygrał " + kto;
    resetGry();
}

//---------------------Resetowanie gry----------------
function resetGry(){
    youCards.innerHTML = "";
    bot1Cards.innerHTML = "";
    bot2Cards.innerHTML = "";
    bot3Cards.innerHTML = "";

    zakryte.splice(0, zakryte.length);
    odkryte.splice(0, odkryte.length);

    suma=0;

    imgDobieranieKart.classList.remove("zakryte");
}