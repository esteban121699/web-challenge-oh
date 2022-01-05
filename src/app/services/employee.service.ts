import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: any): Observable<any> {
    return this.http.post<any>('api/employees', data);
  }

  public update(id: any, data: any): Observable<any> {
    return this.http.put<any>('api/employees/' + id, data);
  }

  public show(id: any): Observable<any> {
    return this.http.get<any>('api/employees/' + id);
  }

  public index(): Observable<any> {
    return this.http.get<any>('api/employees');
  }

  public destroy(id: any): Observable<any> {
    return this.http.delete<any>('api/employees/' + id);
  }
}
