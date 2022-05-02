import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private  serverUrl:string ="http://localhost:9000"

  constructor(private httpClient: HttpClient) { }

  // GET ALL CONTACTS
  public getAllContacts():Observable<IContact[]>{
    let dataURL: string = `${this.serverUrl}/contacts`
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError))
  }

  // GET SINGLE CONTACT

  public getSingleContact(contactId: string):Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError))
  }

  // CREATE A CONTACT

  public createContact(contact: IContact):Observable<IContact>{
    let dataURL:string = `${this.serverUrl}/contacts`
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError))
  }

// UPDATE CONTACT

public updateContact(contact: IContact,contactId: string):Observable<IContact>{
  let dataURL:string = `${this.serverUrl}/contacts/${contactId}`
  return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError))
}

// DELETE CONTACT

public deleteContact(contactId: string):Observable<{}>{
  let dataURL:string = `${this.serverUrl}/contacts/${contactId}`
  return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError))
}

  // GET ALL GROUPS
  public getAllGroups():Observable<IGroup[]>{
    let dataURL: string = `${this.serverUrl}/groups`
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError))
  }


  // GET SINGLE GROUP

  public getSingleGroup(contactId: IContact):Observable<IGroup>{
    let dataURL: string = `${this.serverUrl}/groups/${contactId.groupId}`
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError))
  }

// ERROR HANDLING
  public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
      errorMessage= `Error: ${error.error.message}`
    }else{
      errorMessage=`Status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }
}
