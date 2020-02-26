import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      { id: 1, name: 'Murendeni', phoneNumber: 782852418 },
      { id: 2, name: 'Lebo', phoneNumber: 782852466 },
      { id: 3, name: 'Thabo', phoneNumber: 782852422 },
      { id: 4, name: 'Kwanele', phoneNumber: 782852443 },
      { id: 5, name: 'Muzi', phoneNumber: 782855578 },
      { id: 6, name: 'Tongai', phoneNumber: 782845789 },
      { id: 7, name: 'Terrence', phoneNumber: 782851234 },
      { id: 8, name: 'Neumann', phoneNumber: 782857894 },
      { id: 9, name: 'Magama', phoneNumber: 782852235 },
    ];
    return {contacts};
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  }
}
