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

//--------------------Stosy kart--------------------
var zakryte = [];
var odkryte = [];

//---------------Karty gracz----------------------------------------------------------
var bot1Cards = document.querySelector(".cardsBot1");
var bot2Cards = document.querySelector(".cardsBot2");
var bot3Cards = document.querySelector(".cardsBot3");
var youCards = document.querySelector(".cardsYou");

//----Obsługa ilości kart do pobrania-----------------------------------------------
var sumaSpan = document.querySelector(".centerBoard span");
var suma = 0;
var bitwa = false;

var kartaNaWidoku = document.querySelector("#odkryte");
var ktoTerazGra = document.getElementById("ktoTeraz");


//------------------Obsługa urchomienia i ponowienia gry----------------------------------------------
var nowaGra = document.querySelector(".buttons input");
nowaGra.addEventListener("click", start);

//-------------------------Start gry----------------------------
function start(){
    nowaGra.setAttribute("value", "Od nowa");

    document.getElementById("zakryte").addEventListener("click", function(){
        dobierzKarte("You");
        ktoTerazGra.innerText="Bot1";
        setTimeout("bot()", 5000);
    });

    ktoTerazGra.innerText="You";
    
    sumaSpan.innerText = "";

    resetGry();

    losujKarty(karty);
    
    for(let i=0; i<20;i++){
        let img = stworzKatre(zakryte[i]);

        if(i%4==0) youCards.appendChild(img);
        if(i%4==1) bot1Cards.appendChild(img);
        if(i%4==2) bot2Cards.appendChild(img);
        if(i%4==3) bot3Cards.appendChild(img);
    }
    zakryte.splice(0,20);
    
    odkryte.push(zakryte[0]);
    zakryte.splice(0,1);

    let znak = odkryte[0].substring(0,2);
    if(znak=="02" || znak=="03" || znak=="04" || znak=="0J" || znak=="0Q" || znak=="0K" || znak=="0A") start();

    kartaNaWidoku.setAttribute("src", "img/cards/"+odkryte[0]+".png");
    kartaNaWidoku.setAttribute("alt", odkryte[0]);

    sprawdzeniaKarty(odkryte[0]);
    for(card of youCards.children) card.addEventListener("click", wybranieKarty);
}

function startoweBranieKart(){
    if(suma!=0){
        let check=true;
        
        for(card of youCards.children){
            let kartaPod = kartaNaWidoku.getAttribute("alt");
            let alt = card.getAttribute("alt");

            let cardZnak = alt.substring(0,2);
            let cardFigura = alt.substring(3, alt.length);
            let kartaPodZnak = kartaPod.substring(0,2)
            let kartaPodFigura = kartaPod.substring(3, kartaPod.length);
            
            if((cardZnak==kartaPodZnak || cardFigura==kartaPodFigura) && (cardZnak=="02" || cardZnak=="03" || cardZnak=="0K" || cardZnak=="0Q")) check=false;
        }

        if(check){
            for(let i=0; i<suma;i++){
                let img = stworzKatre(zakryte[0]);
                img.addEventListener("click", wybranieKarty);
        
                youCards.appendChild(img);
                zakryte.splice(0,1);
        
                //alert("Dodaje kartę "+img.getAttribute("alt"));
        
                sprawdzZakryte();
                //alert("Ile mam kart: " + youCards.children.length);
            }

            suma=0;
            sumaSpan.innerText = "";

            ktoTerazGra.innerText="Bot1";
            setTimeout("bot()", 5000);
        }
    }
    if(ktoTerazGra.innerText=="Bot3") ktoTerazGra.innerText="You";
}

//----------------Stwozrenie kart-----------------------------
function stworzKatre(card){
    img = document.createElement("img");
    img.setAttribute("src", 'img/cards/'+card+'.png');
    img.setAttribute("alt", card);
    return img;
}

//-----------Dodawanie karty dla grasza------------------
function dobierzKarte(kto){
    let img = stworzKatre(zakryte[0]);

    if(kto=="You" && ktoTerazGra.innerText=="You"){
        img.addEventListener("click", wybranieKarty);
        youCards.appendChild(img);
    }
    if(kto=="Bot1")  bot1Cards.appendChild(img);
    if(kto=="Bot2")  bot2Cards.appendChild(img);
    if(kto=="Bot3")  bot3Cards.appendChild(img);
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
   
    if(ktoTerazGra.innerText=="You" && sprawdzeniaKarty(wybranaKarta)){
        odkryte.push(wybranaKarta);
    
        //Wyświel zagranie
        wyswietlZagranie(this, "you");

        kartaNaWidoku.setAttribute("src", "img/cards/"+wybranaKarta+".png");
        kartaNaWidoku.setAttribute("alt", wybranaKarta);
        
        this.remove();

        if(sprawdzWygrana(youCards.children, "You")){
            ktoTerazGra.innerText="Bot1";
            //alert(ktoTerazGra.innerText);
            setTimeout("bot()", 5000);
        }
    }
    else if(ktoTerazGra.innerText!="You")alert("Nie twój ruch");
    else alert("Tą kartą nie można zagrać");
}

//-------------------------Obsługa boty----------------------------
function bot(){
    let kto = ktoTerazGra.innerText;

    if(kto=="Bot1"){
        ruchBota(bot1Cards.children);

        if(sprawdzWygrana(bot1Cards.children, "Bot1")){
            ktoTerazGra.innerText="Bot2";
            setTimeout("bot()", 5000);
        }

    }

    if(kto=="Bot2"){
        ruchBota(bot2Cards.children);
  
        if(sprawdzWygrana(bot2Cards.children, "Bot2")){
            ktoTerazGra.innerText="Bot3";
            setTimeout("bot()", 5000);
        }
    }

    if(kto=="Bot3"){
        ruchBota(bot3Cards.children);

        if(sprawdzWygrana(bot3Cards.children, "Bot3")) startoweBranieKart();
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
    //Wyświel zagranie
    if(jestKarta){
        wyswietlKartyWConsoli(cards, "Bot3");
        wyswietlZagranie(zagranaKarta, "Bot3");
    } 

    zmienKarte(jestKarta, zagranaKarta);
}

//---------------------------Ustawienie katy na stos która zosała zagrana--------------------
function zmienKarte(jestKarta, zagranaKarta){
    if(jestKarta){
        kartaNaWidoku.setAttribute("src", zagranaKarta.getAttribute("src"));
        kartaNaWidoku.setAttribute("alt", zagranaKarta.getAttribute("alt"));
        odkryte.push(zagranaKarta.getAttribute("alt"));
        zagranaKarta.remove();
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
            case "04":
                suma+=4;
                sumaSpan.innerText=suma;
                break
            case "0Q":
                suma=0;
                sumaSpan.innerText="";
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
        setTimeout("wygrana('"+kto+"')", 3000);
        return false;
    }
    return true;
}

//-------------------Co ma się stać jeśli ktoś wygrał-----------------------------
function wygrana(kto){
    alert("Wygrał " + kto);
    //document.querySelector(".centerBoard").innerHTML= "<h1>Wygrał " + kto + "</h1>";
        
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
}

//--------------------Pomocnicze funcje--------------------------------
function wyswietlKarty(cards, kto){
    let napis = "<br>Karty " + kto + " : ";
    
    for(let i=0; i<cards.length; i++){
        if(i!=cards.length-1) napis += cards[i]+", ";
        else napis += cards[i];

    }
    napis += " Ile kart zostało:"+cards.length
    document.getElementById("test").innerHTML += napis;
}

function wyswietlKartyWConsoli(cards, kto){
    let napis = "Karty " + kto + " : ";
    
    for(let i=0; i<cards.length; i++){
        let card = cards[i].getAttribute("alt");
        if(i!=cards.length-1) napis += card+", ";
        else napis += card;

    }
    napis += " Ile kart zostało:"+cards.length;
    console.log(napis);
}

function wyswietlZagranie(card, kto){
    let napis = "Zagrał " + kto + ": " + card.getAttribute("alt") + " na " + kartaNaWidoku.getAttribute("alt");
    console.log(napis);
}
//---------------------------------------------