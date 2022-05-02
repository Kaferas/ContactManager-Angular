import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  errorMessage:string='';
  loading:boolean=false;
  contacts: IContact[]={} as IContact[]
  groups: IGroup[]= {} as IGroup[]

  constructor(private contactService: ContactService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data)=>{
      this.groups=data
    },(error)=>{
      this.errorMessage=error
    })
  }

  submitContact(form:any){
    let addedContact:IContact=form.value
    this.contactService.createContact(addedContact).subscribe((data)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage=error;
      this.router.navigate(['/contact/add']).then();
    })
  }

}
