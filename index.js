//import and setting up middleware
var express = require('express'); //call express
var app = express(); //define our app using express

const mongoose = require('mongoose');
const Restaurant = require('./restaurant') 

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.mufal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

var port = process.env.PORT || 8080 //set our port

//Setting route and path
var router  = express.Router()
router.get('/', (req,res)=>{
	res.json({message:'Hula! my API works!!!'})
})  

// Create
router.post('/restaurants', (req,res)=>{
	let newRestaurant = new Restaurant({
		name:req.body.name,
		address:req.body.address,
		email:req.body.email,
		phone:req.body.phone,
		description:req.body.description,
		opening_time:req.body.opening_time,
		latitude:req.body.latitude,
		longitude:req.body.longitude,
		types:req.body.types

	})

	//method save by mongoose to store newRestaurant model data in db
	newRestaurant.save((err)=>{
		if (err) res.json({error:'message'+err})
			res.json({message:'Restaurant succesfully created!'})
	})
})


// Read all
router.get('/restaurants',(req,res)=>{
	Restaurant.find((err,restaurants)=>{
		if (err) res.json({error:"message "+err})
			res.json({message:'OK', data:restaurants})
	})
})

// Read by id
router.get('/restaurants/:id',(req,res)=>{
	Restaurant.findById(req.params.id,(err,restaurants)=>{
		if (err) res.json({error:"message "+err})
			res.json({message:'OK', data:restaurants})
	})
})

// Update by id
router.put('/restaurants/:id', (req,res)=>{
	Restaurant.findByIdAndUpdate(req.params.id,
	{
		name:req.body.name,
		address:req.body.address,
		email:req.body.email,
		phone:req.body.phone,
		description:req.body.description,
		opening_time:req.body.opening_time,
		latitude:req.body.latitude,
		longitude:req.body.longitude,
		types:req.body.types

	}

		,(err,restaurants)=>{
		if (err) res.json({error:"message "+err})
			res.json({message:'Restaurant succesfully updated, yeah!', data:restaurants})
	})
})


app.use('/api',router);

app.listen(port); // create a server that browsers can connect to

console.log("Magic happened at port "+port);
