import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsUrl = 'api/contacts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      return of(result as T);
    };
  }

  getContacts (): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }


addContact (contact: Contact): Observable<Contact> {
  return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
    catchError(this.handleError<Contact>('addContact'))
  );
}

deleteContact (contact: Contact | number): Observable<Contact> {
  const id = typeof contact === 'number' ? contact : contact.id;
  const url = `${this.contactsUrl}/${id}`;

  return this.http.delete<Contact>(url, this.httpOptions).pipe(
    catchError(this.handleError<Contact>('deleteContact'))
  );
}

searchContacts(term: string): Observable<Contact[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`).pipe(
    catchError(this.handleError<Contact[]>('searchContacts', []))
  );
}

}
