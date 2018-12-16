import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  restaurant = {
    "name": '',
    "cuisine": '',
    'description': '',
    "show": true
  }
  errors = {};
  
  constructor(private _ftService: RestaurantService, private _router: Router) { }

  ngOnInit() {
  }
  create(){
    console.log("will soon check to see if duplicate name");
    
    let observable = this._ftService.createRestaurant(this.restaurant);
    console.log("this is my restaurant i'm trying to create:" + this.restaurant);

    observable.subscribe(data => {
      console.log(data);
      if ( data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      } else if ( data['message'] == 'Restaurant name already exists'){
        this.errors = data['message']['errors'];

      } else {
        // Hide delete button after 30 seconds!
        this.HideDeleteButton();

        //and go back to dashboard
        this._router.navigate(['/']);
      }
    });
  }

  HideDeleteButton():void {
    console.log("going to count 30 seconds starting now!");
    console.log("this is my show value before: " + this.restaurant.show);
    console.log("after a small amount of time, i will make it false...");

    // waiting 5 seconds for testing
    setTimeout(function() {
      this.restaurant.show = false;
      console.log("this is my show value AFTER: " + this.restaurant.show);

    }.bind(this), 5000);
    console.log("this is my show value FINAL : " + this.restaurant.show);

  } 

}
