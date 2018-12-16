import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  restaurant: any;
  // newreview = {
  //   "name" : "",
  //   "rating" : 3,
  //   "comment" : ""
  // }

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

  // newRating(id){
  //   let observable = this._ftservice.addReview(id, this.newreview);
  //   observable.subscribe( data => {
  //     this.getRestaurant(id);
  //     this.newreview = {
  //       "name" : "",
  //       "rating" : 3,
  //       "comment" : ""
  //     }
  //   })
  // }

}
