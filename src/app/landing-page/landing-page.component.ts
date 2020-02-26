import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../contact';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  private searchTerms = new Subject<string>();

  contacts: Contact[];
  newContact: Contact;

  constructor(private contactsService: ContactsService) { }
  ngOnInit() {
    this.getContacts();

    this.contacts$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.contactsService.searchContacts(term)),
    );

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.contactsService.addContact({ name } as Contact)
      .subscribe(contact => {
        this.contacts.push(contact);
      });
  }

  getContacts(): void {
    this.contactsService.getContacts()
        .subscribe(contacts => this.contacts = contacts);
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.contactsService.deleteContact(contact).subscribe();
  }

}
