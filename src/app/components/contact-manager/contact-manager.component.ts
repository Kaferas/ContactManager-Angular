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
  oldContacts:string=""

  constructor(private contactService:ContactService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllContactsFromServer()
  }

  getAllContactsFromServer(){
    this.loading=true;
    this.contactService.getAllContacts().subscribe((data)=>{
      this.contacts=data;
      this.oldContacts=JSON.stringify(data);
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

  searchContact(event:any){
    let keyword=event.target.value
    var result=JSON.parse(this.oldContacts).filter((contact:IContact)=>{
      console.log(contact.name,keyword)
      return contact.name.toLowerCase().includes(keyword.toLowerCase()) || contact.mobile.includes(keyword);
    })
    if(keyword.length > 0){
      console.log(result)
      this.contacts=result
    }
    else{
      this.getAllContactsFromServer();
      }
  }

}
