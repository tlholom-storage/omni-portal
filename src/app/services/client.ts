import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export interface Client {
  clientID: number;
  fullName: string;
  email: string;
  status: string;
  assignedManagerEmail: string;
  createdAt: Date;
  lastModifiedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  private getApiUrl(): string {
    return `${this.configService.getApiBaseUrl()}/client`;
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.getApiUrl());
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.getApiUrl()}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.getApiUrl(), client);
  }

  updateClient(id: number, client: Client): Observable<any> {
    return this.http.put(`${this.getApiUrl()}/${id}`, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.getApiUrl()}/${id}`);
  }
}
