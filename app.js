'use strict'

const d = document

const IVA = 21

const lite = 15
const standard = 50
const premium = 200

const paintPrice = price => "<span>" + price + "</span>€"
const triggerAnimation = () => d.querySelector('.products').classList.toggle('up')
const calcIVA = ( number, percentaje ) => (number * percentaje)/100
const calcTotal = ( number, IVA, send ) => number + IVA + send

function calcPrice( product ){
    let type = product.value
    let price

    switch (type) {
        case 'standard':

            price = standard

        break;
        case 'premium':

            price = premium

        break;
        default:

            price = lite

        break;
    }

    let resultIVA = calcIVA( price, IVA )
    let resultShip = price >= 50 ? 0 : 10

    let resultTotal = calcTotal( price, resultIVA, resultShip )
    writePrice( price, resultIVA, resultShip, resultTotal )

    triggerAnimation()

    createCard( type, price )
}


function writePrice( base, iva, ship, total ){

    d.querySelector('.base').innerHTML = paintPrice( base )
    d.querySelector('.tax').innerHTML = paintPrice( iva )
    d.querySelector('.ship').innerHTML =  ship === 0 ? "FREE" : paintPrice( ship )
    d.querySelector('.total').innerHTML = paintPrice( total )

}

function createCard(type, price){
    let nodeproduct = d.querySelector('.cart__product')
    
    nodeproduct.classList.remove('standard', 'premium', 'lite')
    nodeproduct.classList.add( type )

    nodeproduct.innerHTML = `<p class="cart__title">${ type }</p><p class="cart__price"><span>${ price }</span>€/month</p>`
    
}

d.querySelectorAll('.product__button').forEach( button => {
    button.addEventListener('click', function(){
        calcPrice( this )
    })
})

d.querySelector('.cart__button').addEventListener('click', triggerAnimation)


