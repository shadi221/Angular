import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Basket } from '../models/basket';
import { formatDate } from '@angular/common';
import { Order } from '../models/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  products: Product[];
  categories = [];
  search: string;
  url = this.api.url;
  qnt: number = 0;
  singleProduct = Product;
  basket: Basket[];
  createBasket: boolean = false;

  constructor(public api: ApiService, public nav: Router) {
    if (localStorage.user) {
      this.currentUser = JSON.parse(localStorage.user);
    } else {
      alert('You Must Log In To View This Page');
      this.nav.navigate(['']);
    }

    this.api.products.subscribe((data) => {
      this.products = data;
    });

    this.api.categories.subscribe((data) => {
      this.categories = data;
    });

    this.getUserBasket();
  }
  ngOnInit(): void {}

  async getProductsByCat(id) {
    let products = await this.api.getProductsByCat(id);
    this.products = products['data'][0]['products'];
  }

  async getAllProducts() {
    let products = await this.api.getAllProducts();
    this.products = products['data'];
  }

  async addToBasket() {
    let basket = new Basket();
    basket.userId = this.currentUser[0]['id'];
    basket.productId = this.singleProduct[0]['id'];

    if (this.qnt == 0) {
      basket.qnt = 1;
    } else {
      basket.qnt = this.qnt;
    }
    var myDate = new Date();
    var format = 'yyyy/MM/dd';
    const locale = 'en-US';

    const formattedDate = formatDate(myDate, format, locale);
    basket.date = formattedDate;
    basket.done = 0;
    let sentBasket = await this.api.addToBasket(basket);
    this.getUserBasket();
  }

  increaseQnt() {
    this.qnt++;
  }

  reduceQuantity() {
    this.qnt--;
  }

  logOut() {
    localStorage.clear();
    this.nav.navigate(['']);
  }

  async getSingleProduct(id) {
    let product = await this.api.getProductById(id);
    this.singleProduct = product['data'];
  }

  async getUserBasket() {
    let basket = await this.api.getUserBasket(this.currentUser[0].id);
    this.basket = basket['data'];
  }

  getTotal() {
    let total = 0;
    this.basket.map((item) => {
      total += Number(item['product'].price) * item.qnt;
    });
    return total;
  }

  async deleteFromBasket(id) {
    let item = await this.api.deleteFromBasket(id);
    this.getUserBasket();
  }

  goToOrders() {
    this.nav.navigate(['/orders']);
  }
}
