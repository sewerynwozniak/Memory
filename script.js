
class Memory{


    constructor(){
        this.cards = document.querySelectorAll('.card')
        this.fronts = document.querySelectorAll('.front')
        this.frontsArray = [0,1,2,3]
        this.moves=0
        this.colorsArray = [
            'red', 'blue'
        ]
        this.assignColor()
        this.arrayOfCheckingPair = []
        this.isChecking = false;
        this.events()
    }


    events(){
        this.cards.forEach(card=>card.addEventListener('click', ()=>this.checkCard(card)))
    }

    checkCard(card){
        
        if(this.isChecking) return

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

        this.isChecking=true;

        const cardColor1 = this.arrayOfCheckingPair[0].children[1].style.backgroundColor;
        const cardColor2 = this.arrayOfCheckingPair[1].children[1].style.backgroundColor;

        if(cardColor1==cardColor2){
            this.removeMatchedColorFromArray(cardColor1)
            this.isChecking=false;
            this.arrayOfCheckingPair = []
        }else{
            setTimeout( ()=>{this.arrayOfCheckingPair.forEach(card=>{
                this.isChecking=false;
                this.flipBackUnmatchedCard(card)            
            })}, 1500)
            setTimeout( ()=>{this.arrayOfCheckingPair = []}, 1501)
            
        }
    }


    removeMatchedColorFromArray(color){
        const indexOfMatchedColor = this.colorsArray.indexOf(color)
        this.colorsArray.splice(indexOfMatchedColor,1)

    }

    finishGame(){

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












































// const cards = document.querySelectorAll('.card');
// const fronts = document.querySelectorAll('.front');

// const colors =['red', 'red', 'blue', 'blue'];



// cards.forEach(card=>flipCard(card))



// function flipCard(card){
    
//     card.addEventListener('click', (e)=>{

//         console.log()

//         e.target.parentElement.children[0].classList.add('hideBack');
//         e.target.parentElement.children[1].classList.add('showFront');
//         setTimeout(()=>{
//         e.target.parentElement.children[0].classList.remove('hideBack');
//         e.target.parentElement.children[1].classList.remove('showFront');
//         },1000)   
//         })
// }
  





// function assignRandomColors(){

// fronts.forEach(front=>{
// let randomNumber =Math.floor(Math.random()*colors.length);
// front.style.backgroundColor = colors[randomNumber] 
// colors.splice(randomNumber,1)
// })

// }



// assignRandomColors()