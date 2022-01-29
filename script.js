window.addEventListener("resize", function() {
    let player2 = this.document.querySelector(".player2");
    if(this.window.innerWidth<500)  this.document.querySelector(".center").insertBefore(player2, this.document.querySelector(".centerBoard"));
    else    this.document.querySelector(".board").insertBefore(player2, this.document.querySelector(".center"))
})