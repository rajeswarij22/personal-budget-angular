import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any[]>([]);

  // Expose an observable that others can subscribe to
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchData(): void {
    // Check if data already exists in the subject
    if (this.dataSubject.getValue().length > 0) {
      // Data is already available, no need to fetch again
      return;
    }

    // Make the HTTP call to your backend API and populate the data variable
    this.http.get<any[]>('http://localhost:4200/api/data').subscribe((data) => {
      // Update the data subject with the fetched data
      this.dataSubject.next(data);
    });
  }
}
