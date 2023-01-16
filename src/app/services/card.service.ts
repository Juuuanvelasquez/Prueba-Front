import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private myAppUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getListCards(): Observable<any> {
    return this.http.get(this.myAppUrl);
  }

  deleteCard(_id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + _id);
  }

  saveCard(card: any): Observable<any>{
    return this.http.post(this.myAppUrl, card);
  }

  updateCard(_id: number, card: any): Observable<any>{
    return this.http.put(this.myAppUrl + _id, card)
  }
}
