import { Routes } from '@angular/router';
import { Gallery } from './gallery/gallery';
import { About } from './about/about';
import { Contact } from './contact/contact';


export const routes: Routes = [
  { path: '', component: Gallery },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
