import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  restaurants = [];
  errors = {};
  constructor(private _ftservice: RestaurantService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllRestaurants();
    // this.HideDeleteButton();

  }

  getAllRestaurants(){
    let observable = this._ftservice.getRestaurants();
    observable.subscribe( data => {
      this.restaurants = data['restaurants'];
      console.log(data);
    });
  }
  
  delete(id){
    let observable = this._ftservice.deleteOne(id);
    observable.subscribe( data => {
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        this.getAllRestaurants();
        this._router.navigate(['/']);
      }
    })
  }

}
