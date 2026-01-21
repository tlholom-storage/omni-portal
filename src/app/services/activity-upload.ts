import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ConfigService } from './config.service';

export interface SasTokenResponse {
  uploadUrl: string;
}

@Injectable()
export class ActivityUpload {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {}

  private getApiUrl(): string {
    return `${this.configService.getApiBaseUrl()}/sas`;
  }

  /**
   * Requests SAS token + uploads file directly to Azure Blob Storage
   */
  uploadActivityFile(file: File, customFileName: string): Observable<HttpEvent<unknown>> {
    const sasUrl = `${this.getApiUrl()}/token?fileName=${customFileName}`;

    // Request SAS upload URL
    return this.http.get<SasTokenResponse>(sasUrl).pipe(
      // Upload file directly to Azure Blob
      switchMap((response) => {
        const headers = new HttpHeaders({
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'application/json',
        });

        return this.http.put(response.uploadUrl, file, {
          headers,
          reportProgress: true,
          observe: 'events',
        });
      }),
    );
  }
}
