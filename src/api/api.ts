import axios from 'axios';

import { loadToken } from '../bll/utils/localstorage-utils';
import { ContactType, LoginParamsType } from '../types/types';

enum BASE_URLS {
  LOCAL = 'http://localhost:8000',
}
const token = loadToken();

export const instance = axios.create({
  baseURL: BASE_URLS.LOCAL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// REQUESTS

export const authAPI = {
  me() {
    return instance.get('me');
  },
  login(params: LoginParamsType) {
    return instance.post('auth/login', {
      email: params.login,
      password: params.password,
    });
  },
};

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
  searchContact(searchValue: string) {
    return instance.get(`contacts?name_like=${searchValue}`);
  },
};
