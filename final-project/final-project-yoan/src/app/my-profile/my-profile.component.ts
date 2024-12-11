import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../types/user';
import { last } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User = {
    _id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    created_at: '',
    updatedAt: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe((data) => {
      this.user = data;
    });
  }

  // saveProfile(form: NgForm): void {
  //   if (form.invalid) {
  //     return;
  //   }

  //   const { username, email, firstName, lastName } = form.value;
  //   this.userService
  //     .updateProfile(username, email, firstName, lastName)
  //     .subscribe(() => {

  //       alert('Profile updated successfully');
  //     });
  // }
}
