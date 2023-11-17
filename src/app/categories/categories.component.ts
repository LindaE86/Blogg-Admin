import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
[x: string]: any;

  categoryArray: Array<object> | any;
  formCategory!: string;
  formStatus: string ='Add';
  categoryId!: string;

  constructor( private categoryService: CategoriesService ) {}

  ngOnInit(): void {

    this.categoryService.loadData().subscribe( val =>  {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: {
    reset(): unknown; value: { category: any; }; 
}){

    let categoryData: Category ={
      category: formData.value.category
    }

    if( this.formStatus == 'Add' ){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if( this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }



//    this.afs.collection('categories').add(categoryData).then((docRef: any) => {
//      console.log(docRef);
//  })
//  .catch((err: any) => { console.log(err) })
  }
  onEdit(category: any, id: string){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelate(id: string | undefined){
    this.categoryService.delateData(id);
  }
}
