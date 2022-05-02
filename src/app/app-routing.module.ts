import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ErrorNotFoundContactComponent } from './components/error-not-found-contact/error-not-found-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: "/contact/admin" ,
    pathMatch: "full"
  },
  {
    path:"contact/admin",
    component:ContactManagerComponent
  },
  {
    path:"contact/add",
    component:AddContactComponent
  },
  {
    path:"contact/edit/:contactId",
    component:EditContactComponent
  },
  {
    path:"contact/view/:contactId",
    component:ViewContactComponent
  },
  {
    path:"**",
    component:ErrorNotFoundContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
