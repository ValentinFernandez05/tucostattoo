import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo, Tag } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getPhotos(page: number = 0, size: number = 10, tagId?: number): Observable<Photo[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (tagId) {
      params = params.set('tag_id', tagId.toString());
    }
    return this.http.get<Photo[]>(`${this.apiUrl}/photos`, { params });
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/${id}`);
  }
}
