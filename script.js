const cards = document.querySelectorAll('.card');
const fronts = document.querySelectorAll('.front');

const colors =['red', 'red', 'blue', 'blue'];



cards.forEach(card=>flipCard(card))



function flipCard(card){
    card.addEventListener('click', (e)=>{

        e.target.parentElement.children[0].classList.add('hideBack');
        e.target.parentElement.children[1].classList.add('showFront');
        setTimeout(()=>{
        e.target.parentElement.children[0].classList.remove('hideBack');
        e.target.parentElement.children[1].classList.remove('showFront');
        },1000)   
        })
}
  





function assignRandomColors(){

fronts.forEach(front=>{
let randomNumber =Math.floor(Math.random()*colors.length);
front.style.backgroundColor = colors[randomNumber] 
colors.splice(randomNumber,1)
})

}



assignRandomColors()