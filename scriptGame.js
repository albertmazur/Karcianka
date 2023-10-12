//-----------------Nazwy kart--------------------------------
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

//----------------Nazwy graszy------------------------
var gracz1 = "GRACZ 1";
var gracz2 = "GRACZ 2";
var gracz3 = "GRACZ 3";
var ty = "TY";
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
    if(nowaGra.value=="Start"){
        for(let i=0; i<karty.length;i++){
            let img = document.createElement("img");
            img.setAttribute("alt", karty[i]);
            img.setAttribute("src", 'img/cards/'+karty[i]+'.png');
            kartyImg.push(img);
        }
    }

    nowaGra.setAttribute("value", "Od nowa");

    document.getElementById("zakryte").addEventListener("click", dobierzKarteZZakrytych);

    resetGry();
    if(document.querySelector("#ktoWygral")!=null)  document.querySelector("#ktoWygral").remove(); 

    ktoTerazGra.innerText=ty;

    imgDobieranieKart.classList.add("zakryte");

    losujKarty(karty);
    
    for(let i=0; i<20;i++){
        let img = stworzKarte(zakryte[i]);

        if(i%4==0) youCards.appendChild(img);
        if(i%4==1){
            img.setAttribute("src", 'img/cards/background_card_reverse.png');
            bot1Cards.appendChild(img);
        } 
        if(i%4==2){
            img.setAttribute("src", 'img/cards/background_card.png');
            bot2Cards.appendChild(img);
        } 
        if(i%4==3){
            img.setAttribute("src", 'img/cards/background_card_reverse.png');
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
    if(ktoTerazGra.innerText==ty){
        for(let i=1;i<suma;i++) dobierzKarte(ty);
        dobierzKarte(ty);

        suma = 0;
        sumaSpan.innerText = "";

        ktoTerazGra.innerText=gracz1;
        setTimeout("bot()", 2000);
    }
    else alert("Nie twój ruch nie możesz brać karty");
}

//----------------Stwozrenie kart-----------------------------
function stworzKarte(card){
    let img = document.createElement("img");
    if (ktoTerazGra.innerText==ty) img.setAttribute("src", 'img/cards/'+card+'.png');
    else img.setAttribute("src", 'img/cards/background_card.png');
    img.setAttribute("alt", card);
    return img;
}

//-----------Dodawanie karty dla grasza------------------
function dobierzKarte(kto){
    let img = stworzKarte(zakryte[0]);
    
    img.style.opacity = 0;

    if(kto==ty && ktoTerazGra.innerText==ty){
        img.addEventListener("click", wybranieKarty);
        youCards.appendChild(img);
    }
    if(kto==gracz1){
        img.setAttribute("src", 'img/cards/background_card_reverse.png');
        bot1Cards.appendChild(img);
    }  
    if(kto==gracz2)  bot2Cards.appendChild(img);
    if(kto==gracz3){
        img.setAttribute("src", 'img/cards/background_card_reverse.png');
        bot3Cards.appendChild(img);
    }  
    
    setTimeout(function(){img.classList.add("addCard");}, 50);
    
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
    if(zakryte.length==0 && odkryte.length==1){
        let ktoWygral = document.createElement("p");
        ktoWygral.id="ktoWygral";
        ktoWygral.innerText="Koniec gry brak kart w tali. Zagraj od nowa";
        document.querySelector(".centerBoard").insertBefore(ktoWygral, document.querySelector(".centerBoard p"));
        resetGry();
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
   
    if(ktoTerazGra.innerText==ty && sprawdzeniaKarty(wybranaKarta)){
        odkryte.push(wybranaKarta);

        kartaNaWidoku.setAttribute("src", "img/cards/"+wybranaKarta+".png");
        kartaNaWidoku.setAttribute("alt", wybranaKarta);
        
        this.classList.remove("addCard");
        this.classList.add("removeCard");
        let card = this;
        setTimeout(function(){card.remove(); sprawdzWygrana(ktoTerazGra.innerText);}, 800);
        
        setTimeout("bot()", 2000);
    }
    else if(ktoTerazGra.innerText!=ty) alert("Nie twój ruch");
    else alert("Tą kartą nie można zagrać");
}

//-------------------------Obsługa boty----------------------------
function bot(){
    let kto = ktoTerazGra.innerText;

    if(kto==gracz1){
        ruchBota(bot1Cards.children);
        setTimeout("bot()", 2000);
    }

    if(kto==gracz2){
        ruchBota(bot2Cards.children);
        setTimeout("bot()", 2000);
    }

    if(kto==gracz3) ruchBota(bot3Cards.children);
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
    }

    zmienKarte(jestKarta, zagranaKarta);
}

//---------------------------Ustawienie katy na stos która zosała zagrana--------------------
function zmienKarte(jestKarta, zagranaKarta){
    if(jestKarta){
        kartaNaWidoku.setAttribute("src", kartyImg[karty.indexOf(zagranaKarta.getAttribute('alt'))].getAttribute("src"));
        kartaNaWidoku.setAttribute("alt", zagranaKarta.getAttribute("alt"));
        odkryte.push(zagranaKarta.getAttribute("alt"));

        zagranaKarta.classList.remove("addCard");
        zagranaKarta.classList.add("removeCard");
        setTimeout(function(){zagranaKarta.remove(); sprawdzWygrana(ktoTerazGra.innerText);}, 800);
    }
    else{
        for(let i=1; i<suma; i++) dobierzKarte(ktoTerazGra.innerText);
        dobierzKarte(ktoTerazGra.innerText); 
        suma=0;
        sumaSpan.innerText="";
        sprawdzWygrana(ktoTerazGra.innerText);
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

//------------------------setSizeCards-----------------------------
function setSizeCards(kto){
    let cards = [];
    if(kto==gracz1) cards = bot1Cards.children;
    if(kto==gracz2) cards = bot2Cards.children;
    if(kto==gracz3) cards = bot3Cards.children;
    
    let w = "";
    if(cards.length>5) w = "25px";
    else w = "50px";
    
    for(let card of cards){
        if(kto==gracz2) card.style.width=w;
        else card.style.height=w;
    }
}

function setSizeCards2(kto){
    let cards = [];
    if(kto==gracz1) cards = bot1Cards.children;
    if(kto==gracz2) cards = bot2Cards.children;
    if(kto==gracz3) cards = bot3Cards.children;
    
    let w = "";
    if(cards.length>5) w = "50px";
    else w = "75px";
    
    for(let card of cards){
        if(kto==gracz2) card.style.width=w;
        else card.style.height=w;
    }
}

//--------------Sprawdzenie czy ktoś wygrał------------
function sprawdzWygrana(kto){
    if(window.innerWidth<=700) setSizeCards(kto);
    if(window.innerWidth>700 && window.innerWidth<=1500) setSizeCards2(kto);

    let cards;
    switch(kto){
        case ty:
            cards = youCards.children;
            ktoTerazGra.innerText=gracz1;
            break;
        case gracz1:
            cards = bot1Cards.children;
            ktoTerazGra.innerText=gracz2;
            break;
        case gracz2:
            cards = bot2Cards.children;
            ktoTerazGra.innerText=gracz3;
            break;
        case gracz3:
            cards = bot3Cards.children;
            ktoTerazGra.innerText=ty;
            break; 
    }

    if((cards.length)==0) wygrana(kto);
}

//-------------------Co ma się stać jeśli ktoś wygrał-----------------------------
function wygrana(kto){
    let napis;
    if(kto==ty) napis = "Wygrałeś";
    else napis = "Wygrał " + kto;
    let ktoWygral = document.createElement("p");
    ktoWygral.id="ktoWygral";
    ktoWygral.innerText=napis;
    document.querySelector(".centerBoard").insertBefore(ktoWygral, document.querySelector(".centerBoard p"));
    resetGry();
}

//---------------------Resetowanie gry----------------
function resetGry(){
    ktoTerazGra.innerText = "";
    sumaSpan.innerText = "";

    youCards.innerHTML = "";
    bot1Cards.innerHTML = "";
    bot2Cards.innerHTML = "";
    bot3Cards.innerHTML = "";

    zakryte.splice(0, zakryte.length);
    odkryte.splice(0, odkryte.length);

    suma=0;

    imgDobieranieKart.classList.remove("zakryte");
}