import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export abstract class HttpService {

    protected endpoint: string;

    constructor() {
      this.endpoint = environment.endpoint;
    }

    protected getRequestOptions(contentType?: string) {
        let headers = new HttpHeaders();
  
        headers = headers.set('Access-Control-Allow-Credentials', 'true');
  
        if (contentType) {
            headers = headers.set('Content-Type', contentType);
        }
  
        const token =  localStorage.getItem('token');

        if(token) {
          headers = headers.set('Authorization', 'Bearer ' + token);
        }
  
        return { headers };
      }
}