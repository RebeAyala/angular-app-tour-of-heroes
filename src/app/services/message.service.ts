import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', //acessible desde todo el proyecto
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}