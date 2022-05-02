import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  currentContact!:IContact;
  contactGroup!:IGroup
  loading:boolean=false
  groupName:string=''
  errorMessage:string=''

  constructor(private activatedRoute: ActivatedRoute,
              private contactService:ContactService,
              ) { }

  ngOnInit(): void {
    this.loading=true
    let currentId=this.activatedRoute.snapshot.paramMap.get("contactId")
    if(currentId)
    this.contactService.getSingleContact(currentId).subscribe((result)=>{
        this.currentContact = result;
        let groupId=this.currentContact.groupId
        this.contactService.getSingleGroup(result).subscribe(group =>{
          this.contactGroup=group
        })
      setTimeout(()=>{
          this.loading=false;
      },1400)
    },(error)=>{
      this.errorMessage=error
    })
}

notEmpty(){
  return (Object).keys(this.currentContact).length > 0 && Object.keys(this.contactGroup).length > 0;
}

}
