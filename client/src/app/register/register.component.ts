import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  showFields: boolean = false;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
  pID: number;
  firstName: string;
  lastName: string;
  street: string;
  messageShow: boolean = false;
  message: string;
  showMessage: boolean = false;
  num: number;
  constructor(public api: ApiService, public nav: Router) { }

  ngOnInit(): void { }

  nextBtn() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.messageShow = true;
      this.message = 'All Fields Are Required To Proceed';
    } else {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email.match(emailRegex)) {
        this.messageShow = true;
        this.message = 'Invalid Email Address!';
        return;
      }
      if (this.password != this.confirmPassword) {
        this.messageShow = true;
        this.message = 'Password And Confirmed Password Do Not Match';
        return;
      }
      this.checkMail()
    }
  }
  prevBtn() {
    this.showFields = false;
  }

  async signUp() {
    if (!this.pID || !this.city || !this.street) {
      this.messageShow = true;
      this.message = 'All Fields Are Required To Proceed';
    } else {
      this.messageShow = false;
      let user = new User();
      user.first_name = this.firstName;
      user.last_name = this.lastName;
      user.email = this.email;
      user.personal_id = this.pID;
      user.password = this.password;
      user.city = this.city;
      user.street = this.street;
      user.type = 1;
      user.session = this.rand(10000, 99999);
      let signup = await this.api.addUser(user);
      this.showMessage = true;
      this.message = 'Registration Successfully Completed';
    }
  }

  rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    let num = Math.floor(randomNum);
    return num;
  }

  async checkMail() {
    let res = await this.api.checkMail(this.email)
    if (res['data'].length > 0) {
      this.num = 1;
      this.messageShow = true;
      this.message = 'Email Already Registered';
    } else {
      this.num = 0;
      this.messageShow = false;
      this.showFields = true;
    }
  }
}
