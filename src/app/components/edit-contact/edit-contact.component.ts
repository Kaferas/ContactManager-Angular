import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

loading:boolean=false;
errorMessage:string=''
contact:IContact={} as IContact;
groups: IGroup[]={} as IGroup[];
editId:string|null="";

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.editId= this.activatedRoute.snapshot.paramMap.get("contactId");
    if(this.editId){
     this.contactService.getSingleContact(this.editId).subscribe((edited)=>{
       this.contact=edited
       this.loading=false;
       this.contactService.getAllGroups().subscribe((groups)=>{
         this.groups=groups;
       })
      },(error)=>{
        this.errorMessage= error
      })
    }
  }

  updateContact(form:any)
  {
    this.loading=true;
    let formData=form.value;
    if(this.editId)
    this.contactService.updateContact(formData,this.editId).subscribe((data)=>{
      this.router.navigate(['/contact/admin']);
      this.loading=false;
    },(error)=>{
      this.errorMessage=error;
    })
  }

}
