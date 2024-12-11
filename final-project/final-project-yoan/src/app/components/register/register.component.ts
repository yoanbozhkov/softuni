import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { DOMAINS } from '../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  isFieldTextMissing(form: NgForm, controlName: string) {
    return (
      form.controls[controlName]?.touched &&
      form.controls[controlName]?.errors?.['required']
    );
  }

  isEmailNotValid(form: NgForm) {
    return (
      form.controls['email']?.touched &&
      form.controls['email']?.errors?.['emailValidator']
    );
  }

  isPasswordMismatch(form: NgForm) {
    return (
      form.controls['password']?.touched &&
      form.controls['rePassword']?.touched &&
      form.controls['password']?.value !== form.controls['rePassword']?.value
    );
  }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { username, firstName, lastName, email, password, rePassword } =
      form.value;

    this.userService
      .register(username!, firstName!, lastName!, email, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/post']);
      });
  }
}
