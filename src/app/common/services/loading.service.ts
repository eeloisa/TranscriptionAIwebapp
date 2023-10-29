import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoadingEmitter = new EventEmitter<boolean>();

  constructor() { }
}
