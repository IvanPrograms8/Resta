import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-writereview',
  templateUrl: './writereview.component.html',
  styleUrls: ['./writereview.component.css']
})
export class WritereviewComponent implements OnInit {
  restaurant: any;
  newreview = {
    "name" : "",
    "rating" : 3,
    "comment" : ""
  }
  errors = {};

  constructor(private _ftservice: RestaurantService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getRestaurant(params['id']);
    })
  }

  getRestaurant(id){
    let observable = this._ftservice.getOne(id);
    observable.subscribe( data => {
      this.restaurant = data['restaurant']
    })
  }

  cancelRating(id){
    console.log(" I am in cancel mode----");
    let myNewLink = "/restaurant/" + id;
    console.log("I'm cancelling -- this is my new link: " + myNewLink);
    this._router.navigate([myNewLink]);
  }

  newRating(id){
    console.log("this is my new review: " + this.newreview);
    console.log("------------------* * * * *  * * * * * *  -------");
    let observable = this._ftservice.addReview(id, this.newreview);
    observable.subscribe(data => {
      this.getRestaurant(id);
      this.newreview = {
        "name" : "",
        "rating" : 3,
        "comment" : ""
      }
      console.log(data);
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        // this._router.navigate(['/']);
        let myNewLink = "/restaurant/" + id;
        console.log("this is my new link: " + myNewLink);
        this._router.navigate([myNewLink]);
      }
    });

  }

}
