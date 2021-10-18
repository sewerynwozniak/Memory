class Memory{


    constructor(){
        this.cards = document.querySelectorAll('.card')
        this.fronts = document.querySelectorAll('.front')
        this.backs = document.querySelectorAll('.back')
        this.modal = document.querySelector('.modal')
        this.restartBtn = document.querySelector('.restartBtn')
        this.modal__number = document.querySelector('.modal__number')
        this.modalBtn = document.querySelector('.modal__btn')
        this.numberOfMoves = document.querySelector('.moves__nr')
        this.frontsArray=[]
        this.cards.forEach((card,i)=>this.frontsArray.push(i))
        this.moves=0
        this.colorsArray = [
            'red', 'royalblue', 'yellow', 'violet', 'limegreen', 'pink', 'orange', 'ghostwhite', 'slateblue', 'palegreen'
        ]
        this.assignColor()
        this.arrayOfCheckingPair = []
        this.stopTheGame = false;
        this.events()
    }


    events(){
        this.cards.forEach(card=>card.addEventListener('click', ()=>this.checkCard(card)))
        this.modalBtn.addEventListener('click', ()=>this.closeModal())
        this.restartBtn.addEventListener('click', ()=>this.restart())
    }

    restart(){
        this.moves=-1
        this.stopTheGame = false;
        this.updateNumberOfMoves()
        this.fronts.forEach(front=>front.classList.remove('showFront'))
        this.backs.forEach(back=>back.classList.remove('hideBack'))     
        this.colorsArray = [
            'red', 'royalblue', 'yellow', 'violet', 'limegreen', 'pink', 'orange', 'ghostwhite', 'slateblue', 'palegreen'
        ]
        this.fronts.forEach(front=>front.style.backgroundColor='none')
        this.frontsArray=[]
        this.cards.forEach((card,i)=>this.frontsArray.push(i))
        this.assignColor()
    }

    showModal(){
        this.modal.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    closeModal(){
        this.modal.style.transform = 'translate(-50%,-50%) scale(0)'
    }

    checkCard(card){
        
        if(this.stopTheGame){
            return;
        } 


        const back = card.children[0]
        const front = card.children[1]
        
        back.classList.add('hideBack')
        front.classList.add('showFront')
        this.addToArrayOfCheckingPair(card)
    }


    addToArrayOfCheckingPair(card){
        this.arrayOfCheckingPair.push(card)
        if(this.arrayOfCheckingPair.length==2){
            this.checkIfMatch()
        }
    }


    checkIfMatch(){

        this.stopTheGame=true;
        const cardColor1 = this.arrayOfCheckingPair[0].children[1].style.backgroundColor;
        const cardColor2 = this.arrayOfCheckingPair[1].children[1].style.backgroundColor;
        this.updateNumberOfMoves()

        if(cardColor1==cardColor2){
            this.stopTheGame=false;
            this.removeMatchedColorFromArray(cardColor1)         
            this.arrayOfCheckingPair = []
        }else{
            setTimeout( ()=>{this.arrayOfCheckingPair.forEach(card=>{
                this.stopTheGame=false;
                this.flipBackUnmatchedCard(card)            
            })}, 1500)
            setTimeout( ()=>{this.arrayOfCheckingPair = []}, 1501)
            
        }
    }

    updateNumberOfMoves(){
        this.moves++;
        this.numberOfMoves.innerText = this.moves
        this.modal__number.innerText = this.moves
    }


    removeMatchedColorFromArray(color){
        const indexOfMatchedColor = this.colorsArray.indexOf(color)
        this.colorsArray.splice(indexOfMatchedColor,1)
        if(this.colorsArray.length==0){
            this.finishGame()
        }
    }


    finishGame(){
        this.stopTheGame =true
        this.showModal()    
    }



    flipBackUnmatchedCard(card){

        const back = card.children[0]
        const front = card.children[1]
        back.classList.remove('hideBack')
        front.classList.remove('showFront')
    }



    generateRandomFrontIndex(){
        const randomIndex = Math.floor(Math.random()*this.frontsArray.length)
        const selectedNumber =  this.frontsArray[randomIndex]
        this.frontsArray.splice(randomIndex,1)
        return selectedNumber
    }



    assignColor(){

        this.colorsArray.forEach(color=>{
            this.fronts[this.generateRandomFrontIndex()].style.backgroundColor=color
            this.fronts[this.generateRandomFrontIndex()].style.backgroundColor=color
        })

    }


}


const memory = new Memory();


