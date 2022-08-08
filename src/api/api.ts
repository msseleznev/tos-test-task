import axios from 'axios';

import { ContactType } from '../types/types';

enum BASE_URLS {
  LOCAL = 'http://localhost:3001',
}

export const instance = axios.create({
  baseURL: BASE_URLS.LOCAL,
  withCredentials: true,
});

// REQUESTS

export const contactsAPI = {
  getContacts() {
    return instance.get('contacts');
  },
  createContact(params: ContactType) {
    return instance.post('contacts', {
      id: params.id,
      name: params.name,
      phone: params.phone,
    });
  },
  deleteContact(id: string) {
    return instance.delete(`contacts/${id}`);
  },
  editContact(params: ContactType) {
    return instance.patch(`contacts/${params.id}`, {
      name: params.name,
      phone: params.phone,
    });
  },
};
