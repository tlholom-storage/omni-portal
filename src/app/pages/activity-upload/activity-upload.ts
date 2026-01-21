import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClientStore } from '../../services/client-store';
import { Client } from '../../services/client';
import { ActivityUpload as ActivityUploadService } from '../../services/activity-upload';

@Component({
  selector: 'app-activity-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  providers: [ActivityUploadService],
  templateUrl: './activity-upload.html',
  styleUrl: './activity-upload.scss',
})
export class ActivityUpload {
  clients: Client[] = [];
  selectedFile: File | null = null;

  isUploading = false;
  uploadProgress = 0;

  form: FormGroup;

  private clientStore = inject(ClientStore);
  private uploadService = inject(ActivityUploadService);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: null,
      range: this.fb.group({
        start: null,
        end: null,
      }),
    });

    effect(() => {
      this.clients = this.clientStore.clients();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.selectedFile = event.dataTransfer?.files?.[0] ?? null;
  }

  prepareAndUpload() {
    if (!this.selectedFile || this.form.invalid) {
      return;
    }

    const { user, range } = this.form.value;

    if (!user || !range?.start || !range?.end) {
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    const startStr = range.start.toISOString().split('T')[0];
    const endStr = range.end.toISOString().split('T')[0];

    const fileName = `${user.fullName}_${startStr}_to_${endStr}_activity_upload.json`;

    this.uploadService
      .uploadActivityFile(this.selectedFile, fileName)
      .pipe(
        finalize(() => this.resetForm())
      )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }

          if (event.type === HttpEventType.Response) {
            this.uploadProgress = 100;

            this.snackBar.open(`Upload completed: ${fileName}`, 'Close', {
              duration: 4000,
              panelClass: 'success-snackbar',
            });
          }
        },
        error: () => {
          this.snackBar.open('Upload failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        },
      });
  }

  private resetForm() {
    this.isUploading = false;
    this.uploadProgress = 0;
    this.selectedFile = null;
    this.form.reset();
  }
}
