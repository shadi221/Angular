import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url = 'http://localhost:5000/';
  public users = new BehaviorSubject<User[]>([]);
  public products = new BehaviorSubject<Product[]>([]);
  public orders = new BehaviorSubject<Order[]>([]);
  public categories = new BehaviorSubject([]);

  constructor(public http: HttpClient) {
    this.getAllUsers();
    this.getAllProducts();
    this.getAllOrders();
    this.getAllCategories();
  }

  getAllUsers(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get<User[]>(this.url + 'getAllusers')
          .subscribe((data) => {
            resolve(data);
            let users = data['data'];
            this.users.next(users);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getAllProducts(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get<Product[]>(this.url + 'getAllProducts')
          .subscribe((data) => {
            resolve(data);
            let products = data['data'];
            this.products.next(products);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getAllOrders(): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get<Order[]>(this.url + 'getAllOrders')
          .subscribe((data) => {
            resolve(data);
            let orders = data['data'];
            this.orders.next(orders);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  checkUser(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get(
            this.url + 'findUser?' + 'email=' + email + '&password=' + password
          )
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  checkSession(session) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get(this.url + 'findSession?' + 'session=' + session)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  checkMail(mail) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get(this.url + 'checkMail?' + 'email=' + mail)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  addUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'insertUser', user)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getAllCategories() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get(this.url + 'getCategories').subscribe((data) => {
          resolve(data);
          let categories = data['data'];
          this.categories.next(categories);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  addProduct(product) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'insertProduct', product)
          .subscribe((data) => {
            resolve(data);
            this.getAllProducts();
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getProductsByCat(id): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get<Product[]>(this.url + 'getProductsByCategory?' + 'id=' + id)
          .subscribe((data) => {
            resolve(data);
            let products = data['data'];
            this.products.next(products);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getProductById(id): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get<Product[]>(this.url + 'findProduct?' + 'id=' + id)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  editProduct(product) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'updateProduct', product)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  editBasket(product) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'updateBasket', product)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  addToBasket(product) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'addToBasket', product)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  addOrder(order) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .post(this.url + 'insertOrder', order)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getUserBasket(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get(this.url + 'getBasket?' + 'userId=' + userId + '&done=0')
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  deleteFromBasket(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http
          .get(this.url + 'deleteBasket?' + 'id=' + id)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  }
}
