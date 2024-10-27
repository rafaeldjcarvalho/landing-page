import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewletterService } from '../../services/newletter.service';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [
    NewletterService
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newsLetterForm: FormGroup;
  loading = signal(false);

  constructor(private service: NewletterService) {
    this.newsLetterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.loading.set(true);

    if(this.newsLetterForm.valid) {
      this.service.sendData(this.newsLetterForm.value.name, this.newsLetterForm.value.email).subscribe({
        next: () => {
          this.newsLetterForm.reset();
          this.loading.set(false);
        }
      });
    }
  }
}
