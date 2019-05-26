import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  addr = 'http://' + environment.BACKEND_ADDRESS;

  constructor(private http: HttpClient) {
  }


  communication_test() {
    return this.http.get(this.addr + '/request');
  }

  get_cwd() {
    return this.http.get(this.addr + '/cwd');
  }
}
