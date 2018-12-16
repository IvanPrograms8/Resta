console.log("inside of restaurants.js");

const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

class Restaurants {
    getAll(req, res){
        Restaurant.find({}).sort({"rating" : -1}).exec( function(err, restaurants){
            if(err){
                res.json({"status": "not ok", "errors": err});
            }else{
                res.json({"status": "ok", "restaurants": restaurants});
            }
        });
    }

    getId(req, res){
        Restaurant.findOne({_id: req.params.id}).sort({"rating":-1}).exec( function(err, restaurant){
          if(err){
              res.json({"status": "not ok", "errors": err});
          }
          else{
              console.log("I just grabbed all the reviews from one RESTAURANT!! *********** ");
              res.json({"status": "ok", "restaurant": restaurant});
          }
        });
    }

    // original:
    // getId(req, res){
    //     Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
    //       if(err){
    //           res.json({"status": "not ok", "errors": err});
    //       }
    //       else{
    //           res.json({"status": "ok", "restaurant": restaurant});
    //       }
    //     })
    // }



    create(req, res){
        //checking to see if name already exists in database before creating a restaurant
        Restaurant.findOne({name:req.body.name},(err,restaurant)=>{
            if(restaurant){
                console.log("I FOUND A DUPLICATE!!! Show this on server side");
                return res.json({
                    "status": "not ok", "errors": restaurant});
                    
            } else{
                let restaurant = new Restaurant(req.body);
                restaurant.save(function(err){
                    //let's try this:

                    if(err){
                        res.json({"status": "not ok", "errors": err});
                    }else{
                        res.json({"status": "ok"});
                    }
                });
            }
        });
   
    }

    update(req, res){
      Restaurant.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true}, function(err){
        if(err){
            res.json({"status": "not ok", "errors": err});
        }else{
            res.json({"status": "ok"});
        }
      })
    }

    delete(req, res){
      Restaurant.remove({_id: req.params.id}, function(err){
        if(err){
            res.json({"status": "not ok", "errors": err});
        }else{
            res.json({"status": "ok"});
        }
      })
    }
}

module.exports = new Restaurants();
