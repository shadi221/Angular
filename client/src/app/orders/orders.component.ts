import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Basket } from '../models/basket';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  currentUser: any;
  basket: Basket[];
  orderMessage: string;
  card: string;
  shippingDate: Date;
  street: string;
  city: string;
  orderError: boolean = false;
  orderCorrect: boolean = false;
  search: string;

  constructor(public api: ApiService, public nav: Router) {
    if (localStorage.user) {
      this.currentUser = JSON.parse(localStorage.user);
    } else {
      alert('You Must Log In To View This Page');
      this.nav.navigate(['']);
    }

    this.getUserBasket();
  }

  ngOnInit(): void { }

  async getUserBasket() {
    let basket = await this.api.getUserBasket(this.currentUser[0].id);
    this.basket = basket['data'];
  }

  dblClick(e) {
    this[e.target.name] = this.currentUser[0][e.target.name];
  }

  getTotal() {
    let total = 0;
    this.basket.map((item) => {
      total += Number(item['product'].price) * item.qnt;
    });
    return total;
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  downloadOrderTxt() {
    var text = '';
    text += `\r Hello and Thank You For Your Purchase! \r your order will arrive at ${this.shippingDate}\r`;
    for (let i = 0; i < this.basket.length; i++) {
      text += `\r ${this.basket[i]['product'].name} | Price: ${this.basket[i]['product'].price}`
    }
    text += `\rtotal-price: ${this.getTotal()}₪.\r`
    var filename = 'Order.txt';
    this.download(filename, text);
  }

  returnToHomePage() {
    this.nav.navigate(['/home']);
  }


  async placeOrder() {
    if (!this.city || !this.card || !this.street || !this.shippingDate) {
      this.orderError = true;
      this.orderMessage = '* Please Fill All Fields';
    } else {
      let order = new Order();
      order.userId = this.currentUser[0].id;
      order.basketId = this.basket.slice(-1)[0].id;
      order.total_price = this.getTotal();
      order.address_city = this.city;
      order.address_street = this.street;
      order.date = this.shippingDate;

      order.card = this.card.slice(this.card.length - 4);
      order.ispaid = 1;
      let sentOrder = await this.api.addOrder(order);

      if (sentOrder['status'] == 1) {
        this.orderCorrect = true;
        let product = new Basket();

        this.basket.map(async (item) => {
          product.id = item.id;
          product.done = 1;

          let updateBasket = await this.api.editBasket(product);
        });
      }
    }
  }
}
