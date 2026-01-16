import { Injectable, signal } from '@angular/core';
import { Client, ClientService } from './client';

@Injectable({ providedIn: 'root' })
export class ClientStore {
  private _clients = signal<Client[]>([]);
  private _loaded = signal(false);
  private _loading = signal(false);

  clients = this._clients.asReadonly();
  loaded = this._loaded.asReadonly();
  loading = this._loading.asReadonly();

  constructor(private api: ClientService) {
    this.loadClients();
  }

  loadClients(): void {
    if (this._loaded() || this._loading()) return;

    this._loading.set(true);

    this.api.getClients().subscribe({
      next: (clients) => {
        this._clients.set(clients);
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  add(client: Client): void {
    this.api.addClient(client).subscribe((created) => {
      this._clients.update((list) => [...list, created]);
    });
  }

  update(id: number, client: Client): void {
    this.api.updateClient(id, client).subscribe(() => {
      this._clients.update((list) =>
        list.map((c) => (c.clientID === id ? { ...c, ...client } : c))
      );
    });
  }

  remove(id: number): void {
    this.api.deleteClient(id).subscribe(() => {
      this._clients.update((list) => list.filter((c) => c.clientID !== id));
    });
  }
}

