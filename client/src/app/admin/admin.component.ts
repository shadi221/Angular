import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  categories = [];
  currentUser: any;
  search: string;
  cat: number;
  newProduct: boolean;
  name: string;
  price: number;
  products: Product[];
  formData: any = new FormData();
  filesToUpload: Array<File> = [];
  messageShow: boolean = false;
  message: string;
  url = this.api.url;
  singleProduct = Product;

  editCat: number;
  editName: string;
  editPrice: number;
  editFilesToUpload: Array<File> = [];
  errorMsg: boolean;
  successMsg: boolean;
  editFormData: any = new FormData();

  constructor(public api: ApiService, public nav: Router) {
    if (localStorage.user) {
      this.currentUser = JSON.parse(localStorage.user);
      if (this.currentUser[0]['type'] == 1) {
        alert('Page Only Available To Admins Sorry :(');
        this.nav.navigate(['']);
      }
    } else {
      alert('You Must Log In To View This Page');
      this.nav.navigate(['']);
    }

    this.api.categories.subscribe((data) => {
      this.categories = data;
    });

    this.api.products.subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit(): void {}

  formDisplay() {
    this.newProduct = !this.newProduct;
  }

  addPhoto(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  async addProduct() {
    this.messageShow = false;
    if (!this.name || !this.price || !this.filesToUpload || !this.cat) {
      this.errorMsg = true;
      this.message = 'All Fields Are Required To Add a Product';
    } else {
      this.errorMsg = false;
      this.messageShow = false;
      this.formData = new FormData();
      this.formData.append('name', this.name);
      this.formData.append('price', this.price);
      this.formData.append('categoryId', this.cat);

      for (let i = 0; i < this.filesToUpload.length; i++) {
        this.formData.append(
          'uploads[]',
          this.filesToUpload[i],
          this.filesToUpload[i]['name']
        );
      }

      let result = await this.api.addProduct(this.formData);
      if (result['status'] == 1) {
        this.messageShow = true;
        this.message = 'Product Added Succefully';
        this.name = '';
        this.price = 0;
        this.cat = 0;
        this.filesToUpload = [];
      }
    }
  }

  async getProductsByCat(id) {
    let products = await this.api.getProductsByCat(id);
    this.products = products['data'][0]['products'];
  }

  async getAllProducts() {
    let products = await this.api.getAllProducts();
    this.products = products['data'];
  }

  async getSingleProduct(id) {
    let product = await this.api.getProductById(id);
    this.singleProduct = product['data'];
  }

  editAddPhoto(fileInput: any) {
    this.editFilesToUpload = <Array<File>>fileInput.target.files;
  }

  async editProduct() {
    if (
      !this.editName ||
      !this.editPrice ||
      !this.editFilesToUpload ||
      !this.editCat
    ) {
      this.errorMsg = true;
      this.message = 'All Fields Are Required To Edit a Product';
    } else {
      this.errorMsg = false;
      this.editFormData = new FormData();
      this.editFormData.append('id', this.singleProduct[0]['id']);
      this.editFormData.append('name', this.editName);
      this.editFormData.append('price', this.editPrice);
      this.editFormData.append('categoryId', this.editCat);

      for (let i = 0; i < this.editFilesToUpload.length; i++) {
        this.editFormData.append(
          'uploads[]',
          this.editFilesToUpload[i],
          this.editFilesToUpload[i]['name']
        );
      }

      let result = await this.api.editProduct(this.editFormData);
      if (result['status'] == 1) {
        this.successMsg = true;
        this.message = 'Product Updated Succefully';
        this.getAllProducts();
      }
    }
  }

  logOut() {
    localStorage.clear();
    this.nav.navigate(['']);
  }
}
