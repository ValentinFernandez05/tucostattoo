export interface Photo {
  id: number;
  filename: string;
  originalFilename: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}
