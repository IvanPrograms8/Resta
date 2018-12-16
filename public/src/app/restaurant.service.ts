import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private _http: HttpClient) { }

  getRestaurants(){
    return this._http.get('/restaurants');
  }
  createRestaurant(restaurant){
    return this._http.post('/restaurant', restaurant);
  }
  getOne(id){
    return this._http.get(`/restaurant/${id}`);
  }

  addReview(id, review){
    return this._http.post(`/restaurant/${id}/review`, review);
  }

  updateOne(id, restaurant){
    return this._http.put(`/restaurant/${id}`, restaurant);
  }

  deleteOne(id){
    return this._http.delete(`/restaurant/${id}`);
  }


}
