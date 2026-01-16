import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService, Client } from './client';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://localhost:5001/api/client';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no unmatched requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clients', () => {
    const mockClients: Client[] = [
      {
        clientID: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        status: 'Active',
        assignedManagerEmail: 'manager@example.com',
        createdAt: new Date(),
        lastModifiedBy: 'system'
      },
      {
        clientID: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Inactive',
        assignedManagerEmail: 'manager@example.com',
        createdAt: new Date(),
        lastModifiedBy: 'system'
      }
    ];

    service.getClients().subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should fetch a single client by id', () => {
    const mockClient: Client = {
      clientID: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      assignedManagerEmail: 'manager@example.com',
      createdAt: new Date(),
      lastModifiedBy: 'system'
    };

    service.getClient(1).subscribe((client) => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should create a client', () => {
    const newClient: Client = {
      clientID: 3,
      fullName: 'Alice',
      email: 'alice@example.com',
      status: 'Lead',
      assignedManagerEmail: 'manager@example.com',
      createdAt: new Date(),
      lastModifiedBy: 'system'
    };

    service.addClient(newClient).subscribe((client) => {
      expect(client).toEqual(newClient);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(newClient);
  });

  it('should update a client', () => {
    const updatedClient: Client = {
      clientID: 1,
      fullName: 'John Updated',
      email: 'john@example.com',
      status: 'Active',
      assignedManagerEmail: 'manager@example.com',
      createdAt: new Date(),
      lastModifiedBy: 'system'
    };

    service.updateClient(1, updatedClient).subscribe((client) => {
      expect(client).toEqual(updatedClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedClient);
    req.flush(updatedClient);
  });

  it('should delete a client', () => {
    service.deleteClient(1).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
