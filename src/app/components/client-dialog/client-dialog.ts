import { Component, inject, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Client, ClientService } from '../../services/client';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ClientStore } from '../../services/client-store';

@Component({
  selector: 'app-client-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './client-dialog.html',
  styleUrl: './client-dialog.scss',
})
export class ClientDialog implements OnInit {
  form: any;
  private store = inject(ClientStore);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
    private dialogRef: MatDialogRef<ClientDialog>,
    private fb: FormBuilder
  ) {
    this.data = data;
  }
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['Active'],
      assignedManagerEmail: ['', [Validators.email]],
    });

    if (this.data) this.form.patchValue(this.data);
  }

  save() {
    if (this.form.invalid) return;

    const payload = {
      ...this.data,
      ...this.form.getRawValue(),
      lastModifiedBy: 'New-Admin-Portal',
    } as Client;

    const request$ = this.data
      ? this.store.update(this.data.clientID, payload)
      : this.store.add(payload);

    this.dialogRef.close(true);
  }
}
