import { Component, effect, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Client } from '../../services/client';
import { ClientDialog } from '../../components/client-dialog/client-dialog';
import { ClientStore } from '../../services/client-store';

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './client-management.html',
  styleUrl: './client-management.scss',
})
export class ClientManagement implements OnInit, AfterViewInit {
  private store = inject(ClientStore);
  private dialog = inject(MatDialog);

  displayedColumns = ['name', 'email', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterForm = new FormGroup({
    filter: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const clients = this.store.clients();
      this.dataSource.data = clients;
    });
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      if (sortHeaderId === 'name') {
        return data.fullName;
      }
      return (data as any)[sortHeaderId];
    };

    this.store.loadClients();

    this.filterForm.controls.filter.valueChanges.subscribe((value) => {
      this.applyFilter(value);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openAdd() {
    this.dialog.open(ClientDialog, { width: '400px' });
  }

  openEdit(client: Client) {
    this.dialog.open(ClientDialog, {
      width: '400px',
      data: client,
    });
  }

  delete(client: Client) {
    if (confirm(`Are you sure you want to delete ${client.fullName}?`)) {
      this.store.remove(client.clientID);
    }
  }

}
