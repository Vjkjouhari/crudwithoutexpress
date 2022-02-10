let products = require('../crudwoframework/citylist')
const { v4:uuidv4} =require('uuid')
const { writeDatatoFile } = require('../util')

function findAll() {
    //use promise
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}
function findById(id) {
    //use promise
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product){
    return new Promise((resolve, reject) => {
       const newProduct = {id:uuidv4(), ...product}
       products.push(newProduct)
       writeDatatoFile('./crudwoframework/citylist.json', products)
       resolve(newProduct)
    })
}
function update(id, product){
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p)=>p.id === id)
        products[index] = {id, ...product}
        writeDatatoFile('./crudwoframework/citylist.json', products)
        resolve(products[index])
    })
}
function remove(id){
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        writeDatatoFile('./crudwoframework/citylist.json', products)
        resolve()
    })
}
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}