import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  loading:boolean=false;
  errorMessage:string=""
  contacts: IContact[]=[];

  constructor(private contactService:ContactService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllContactsFromServer()
  }

  getAllContactsFromServer(){
    this.loading=true;
    this.contactService.getAllContacts().subscribe((data)=>{
      this.contacts=data;
      setTimeout(()=>{
          this.loading=false;
      },1300)
    },(error)=>{
      this.errorMessage=error
      this.loading=false;
    })
  }

  eraseContact(contactId:string | undefined){
    this.loading=true;
    if(contactId)
    this.contactService.deleteContact(contactId).subscribe((data)=>{
      setTimeout(()=>{
        this.loading=false;
      },1300)
      this.getAllContactsFromServer()
    },(error)=>{
      this.errorMessage=error;
    })
  }

}
