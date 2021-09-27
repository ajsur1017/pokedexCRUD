const express = require('express')
const app = express()
const pokemon = require("./models/pokemon.js")
const port = 3000
const methodOverride = require("method-override")

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"))
app.use(methodOverride('_method'))

// Index
app.get('/pokemon', (req, res) => { 
    res.render("index.ejs", {pokemon, title: "Pokedex - Index Page"})
});
// New
app.get('/pokemon/new', (req, res) => {
    res.render("new.ejs", {title: "Pokedex - New Page"})
});
// Delete
app.delete('/pokemon/:index', (req, res) => {
    pokemon.splice(req.params.index,1)
    res.redirect("/pokemon")
})
// Update
app.put("/pokemon/:index", (req, res) => {
    pokemon[req.params.index] = req.body
    res.redirect('/pokemon')
})
// Create
app.post('/pokemon', (req, res) => {
    pokemon.push(req.body)
    res.redirect("/pokemon")
})
// Edit
app.get('/pokemon/:index/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.index],
        index: req.params.index,
        title: "Pokedex - Edit Page"
    })
})
// Show
app.get('/pokemon/:index', (req, res) => {
    res.render("show.ejs", {
        pokemon: pokemon[req.params.index], 
        title: "Pokedex - Show Page"})
    
})

app.listen(`${port}`, () => {
    console.log(`Listening on port: ${port}`)
});