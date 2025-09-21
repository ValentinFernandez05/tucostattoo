import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../services/photo';
import { TagService } from '../services/tag';
import { Photo, Tag } from '../models/photo';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements OnInit {
  photos: Photo[] = [];
  tags: Tag[] = [];
  selectedTagId: number | null = null;

  constructor(private photoService: PhotoService, private tagService: TagService) {}

  ngOnInit(): void {
    this.loadTags();
    this.loadPhotos();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  loadPhotos(tagId?: number): void {
    this.photoService.getPhotos(0, 20, tagId || undefined).subscribe(photos => this.photos = photos);
  }

  onTagSelect(tagId: number | null): void {
    this.selectedTagId = tagId;
    this.loadPhotos(tagId || undefined);
  }

  openModal(photo: Photo): void {
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const modalDescription = document.getElementById('modalDescription') as HTMLElement;
    const modalTags = document.getElementById('modalTags') as HTMLElement;
    modalImage.src = 'http://localhost:8080/media/' + photo.filename;
    modalDescription.textContent = photo.description || 'Sin descripción';
    modalTags.textContent = 'Tags: ' + photo.tags.map(t => t.name).join(', ');
    // Show modal using Bootstrap
    const modal = new (window as any).bootstrap.Modal(document.getElementById('photoModal'));
    modal.show();
  }

  getTagNames(photo: Photo): string {
    return photo.tags.map(t => t.name).join(', ');
  }
}
