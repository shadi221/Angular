import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Basket } from '../models/basket';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users;
  products;
  orders;
  clicked: boolean = false;
  icon = 'fa fa-fw fa-eye field-icon toggle-password';
  fieldType = 'password';
  usersArr: User[];
  productssArr: Product[];
  ordersArr: Order[];
  email: string;
  password: string;
  currentUser: any;
  message: string;
  messageShow: boolean = false;
  basket: Basket[];

  constructor(public api: ApiService, public nav: Router) {
    this.api.users.subscribe((data) => {
      this.usersArr = data;
      this.users = this.usersArr.length;
    });

    this.api.products.subscribe((data) => {
      this.productssArr = data;
      this.products = this.productssArr.length;
    });

    this.api.orders.subscribe((data) => {
      this.ordersArr = data;
      this.orders = this.ordersArr.length;
    });

    if (localStorage.user) {
      this.currentUser = JSON.parse(localStorage.user);
      this.getUserBasket();
    }
  }

  ngOnInit(): void {}

  showPass() {
    this.clicked = !this.clicked;
    if (this.clicked) {
      this.icon = 'fa fa-eye-slash field-icon toggle-password';
      this.fieldType = 'text';
    } else {
      this.icon = 'fa fa-fw fa-eye field-icon toggle-password';
      this.fieldType = 'password';
    }
  }

  async getUser() {
    if (!this.email || !this.password) {
      this.messageShow = true;
      this.message = 'All Fields Are Required To Proceed';
    } else {
      let user: any;
      user = await this.api.checkUser(this.email, this.password);
      let curUser = user['data'];

      if (curUser.length == 0) {
        this.messageShow = true;
        this.message = 'Email Or Password Are Incorrect';
        return;
      }
      this.messageShow = false;
      this.currentUser = user['data'];
      localStorage.user = JSON.stringify(this.currentUser);
      this.getUserBasket();
    }
  }

  async checkUserSession() {
    let session = this.currentUser[0]['session'];
    let currestSession = await this.api.checkSession(session);
    if (currestSession['status'] == 1) {
      if (this.currentUser[0]['type'] == 0) {
        this.nav.navigate(['admin']);
      } else if (this.currentUser[0]['type'] == 1) {
        this.nav.navigate(['home']);
      }
    }
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  async getUserBasket() {
    let basket = await this.api.getUserBasket(this.currentUser[0].id);
    this.basket = basket['data'];
  }
}
