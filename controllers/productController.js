const Product = require('../models/productsModel')
const { getPostData } = require('../util')


// @desc Gets all products
// @route GET /api/products
async function getProduct(req, res){
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets single products
// @route GET /api/products
async function getProducts(req, res, id){
    try {
        const product = await Product.findById(id)
        if( !product){
            
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message : 'No reslt found'}))
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error)
    }
}

//@create products
// @route post /api/products

async function createProduct(req, res){
   
    try {
        const body = await getPostData(req)
        const {name, state} = JSON.parse(body)
        const product = {
            name,
            state
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))
        
    } catch (error) {
        console.log(error)
    }
}


//@update products
// @route PUT /api/products
async function updateProduct(req, res, id){
    try {
        const product = await Product.findById(id)
        if( !product){
            
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message : 'No reslt found'}))
        } else {
            const body = await getPostData(req)
            const {name, state} = JSON.parse(body)
            const productData = {
                name: name || product.name,
                state: state || product.state
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error)
    }
}

//@delete products
// @route DELETE /api/products
async function deleteProduct(req, res, id){
    try {
        const product = await Product.findById(id)
        if( !product){
            
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message : 'No reslt found'}))
        }else{
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message:`product ${id} removed` }))
        }

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}



















 // try {
        
    //     let body = ''
    //     req.on('data', (chunk) => {
    //         body += chunk.toString()
    //     })

    //     req.on('end', async() => {

    //         const {name, state} = JSON.parse(body)
    //         const product = {
    //             name,
    //             state
    //         }
    
    //         const newProduct = await Product.create(product)

    //         res.writeHead(201, {'Content-Type': 'application/json'})
    //         return res.end(JSON.stringify(newProduct))
    //     })

        
    // } catch (error) {
    //     console.log(error)
    // }