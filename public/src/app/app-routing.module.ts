import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SingleComponent } from './single/single.component';
import { WritereviewComponent } from './writereview/writereview.component';

const routes: Routes = [
  { path: '', component: ListComponent  },
  { path: 'newrestaurant', component: NewComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'restaurant/:id', component: SingleComponent},
  { path: 'restaurant/review/:id', component: WritereviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
