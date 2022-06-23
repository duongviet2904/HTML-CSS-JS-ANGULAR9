import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmComponent } from './add-em/add-em.component';
import { EditEmComponent } from './edit-em/edit-em.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddEmComponent},
  {path: 'edit', component: EditEmComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
