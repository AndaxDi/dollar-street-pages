import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../app.config';

@Injectable()
export class PhotographersService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getPhotographers(query: any): Observable<any> {
    return this.http.get(`${Config.api}/v1/photographers?${query}`).map((res: any) => {
      let parseRes = JSON.parse(res._body);
      return {err: parseRes.error, data: parseRes.data};
    });
  }
}