window.addEventListener("resize", function(){
    if(window.innerWidth<=700){
        if(bot1Cards.children.length>5){   
          for(let card of bot1Cards.children){
            card.style.height = "25px";
          }
        }
        if(bot2Cards.children.length>5){
            for(let card of bot2Cards.children.length){
                card.style.width = "25px";
            }
        }
        if(bot3Cards.children.length>5){
            for(let card of bot3Cards.children){
                card.style.height = "25px";
            }
        }
    }
    else if(window.innerWidth>700 && window.innerWidth<=1500){
        if(bot1Cards.children.length>5){   
            for(let card of bot1Cards.children){
              card.style.height = "50px";
            }
          }
          if(bot2Cards.children.length>5){
              for(let card of bot2Cards.children.length){
                  card.style.width = "50px";
              }
          }
          if(bot3Cards.children.length>5){
              for(let card of bot3Cards.children){
                  card.style.height = "50px";
              }
          }
    }
    else{
        for(let card of bot1Cards.children) card.style.height = "";
        for(let card of bot2Cards.children) card.style.width = "";
        for(let card of bot3Cards.children) card.style.height = "";
    }
});