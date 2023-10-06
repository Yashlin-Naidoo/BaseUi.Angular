import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  { path: '', component: AppComponent,canActivate: [HomeGuard] } // base route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
