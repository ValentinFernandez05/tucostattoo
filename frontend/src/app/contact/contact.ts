import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
  
})
export class Contact {
  name: string = '';
  email: string = '';
  message: string = '';
  isSending: boolean = false;
  sendSuccess: boolean | null = null;

  sendEmail(e: Event) {
    e.preventDefault();
    this.isSending = true;
    this.sendSuccess = null;

    emailjs.send(
      'service_7v3n0vd',   // ✅ Service ID
      'template_4qshnmm',  // ✅ Template ID
      {
        name: this.name,
        email: this.email,
        message: this.message
      },
      'sjae1q_MDXW_GKnTE'  // ✅ Public Key
    )
    .then((result: EmailJSResponseStatus) => {
      console.log('SUCCESS!', result.text);
      this.sendSuccess = true;
      this.resetForm();
    })
    .catch((error) => {
      console.error('FAILED...', error.text);
      this.sendSuccess = false;
    })
    .finally(() => {
      this.isSending = false; // 🔑 siempre vuelve al estado normal
    });
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
