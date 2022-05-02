import { Component, OnInit } from '@angular/core';
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

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
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

}
