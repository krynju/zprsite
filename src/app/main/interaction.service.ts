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
    return this.http.get(this.addr + '/api/request');
  }

  get_cwd() {
    return this.http.get(this.addr + '/api/cwd');
  }

  get_csv_info(filename: string) {
    return this.http.get(this.addr + '/api/csv_info', {params: {filename}});
  }

  report_request(cargo) {
    return this.http.post(this.addr + '/api/report', {data: cargo});
  }

  see_report(name) {
    return this.http.get(this.addr + '/app/report');
  }
}
