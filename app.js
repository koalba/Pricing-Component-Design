'use strict'

const IVA = 21

const lite = 15
const standard = 50
const premium = 200

function calcPrice(product){
    let type = product.value
    let price

    if( type === "lite" ){
        price = lite
    } else if( type === "standard" ){
        price = standard
    } else if( type === "premium" ){
        price = premium
    }

    let resultIVA = calcIVA(price, IVA)

    let resultShip

    if ( price >= 50){
        resultShip = 0 // ENVIO GRATINS
    } else {
        resultShip = 10 //ENVIO 10€
    }

    let resultTotal = calcTotal(price, resultIVA, resultShip)

    writePrice(price, resultIVA, resultShip, resultTotal)

    triggerAnimation()

    createCard(type, price)
}


function writePrice(base, iva, ship, total){

    let nodeBase = document.querySelector('.base')
    let nodeIVA = document.querySelector('.tax')
    let nodeShip = document.querySelector('.ship')
    let nodeTotal = document.querySelector('.total')

    nodeBase.innerHTML = "<span>" + base + "</span>€"
    nodeIVA.innerHTML = "<span>" + iva + "</span>€"
    
    if(ship === 0){
        nodeShip.innerHTML = "FREE"
    } else {
        nodeShip.innerHTML = "<span>" + ship + "</span>€"
    }

    nodeTotal.innerHTML = "<span>" + total + "</span>€"
}

function triggerAnimation(){
    let container = document.querySelector('.products')

    container.classList.toggle('up')
}

function createCard(type, price){
    let nodeproduct = document.querySelector('.cart__product')

    if( type === "lite" ){

        nodeproduct.classList.remove('standard')
        nodeproduct.classList.remove('premium')

        nodeproduct.classList.add('lite')

    } else if (type === "standard"){

        nodeproduct.classList.remove('lite')
        nodeproduct.classList.remove('premium')

        nodeproduct.classList.add('standard')

    } else if (type === "premium"){

        nodeproduct.classList.remove('standard')
        nodeproduct.classList.remove('lite')

        nodeproduct.classList.add('premium')

    }

    nodeproduct.innerHTML = '<p class="cart__title">' + type + '</p><p class="cart__price"><span>' + price + '</span>€/month</p>'
    
}

function calcIVA ( number , percentaje){

    let result = (number * percentaje)/100
    return result

}

function calcTotal ( number, IVA, send ){

    let result = number + IVA + send
    return result

}

function goBack(){
    triggerAnimation()
}