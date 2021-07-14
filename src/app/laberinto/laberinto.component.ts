import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laberinto',
  templateUrl: './laberinto.component.html',
  styleUrls: ['./laberinto.component.css']
})
export class LaberintoComponent implements OnInit {

  matrizForm: FormGroup;
  matriz: any = undefined;
  array: any = new Array();
  col: any;
  row: any;
  length: any;
  ans: string | undefined;

  constructor(
    public fb: FormBuilder,
  ) {
    this.matrizForm = fb.group({
      length: [2, [Validators.required, Validators.min(2)]],
      jumps: [1, [Validators.required, Validators.min(1)]],
      roadExist: false,
      roads: fb.array([])
    });
  }

  ngOnInit(): void {}

  get roads(): FormArray {
    return this.matrizForm.get('roads') as FormArray;
  }

  getValidity(i: number, param: string) {
    return (<FormArray><unknown>this.roads.controls[i].hasError(param)) 
  }

  paintMatriz(matriz: any){
    this.matriz = undefined;
    let length = matriz.length;
    this.roads.clear();
    this.matrizForm.get('roadExist')?.setValue(true);
    for (let index = 0; index < Math.pow(length, 2); index++) {
      if(index === 0 || index === Math.pow(length, 2)-1){
        this.roads.push(this.fb.control({value: '.', disabled: true}));
      } else{
        this.roads.push(this.fb.control('', [Validators.required, Validators.pattern('[#]|[.]'), Validators.maxLength(1), Validators.minLength(1)]));
      }
    }
  }

  fillMatriz(form: any){
    this.length = form.length;

    this.col = new Array(this.length);
    for(let i = 0; i < this.length; i++){
      this.col[i] = new Array(this.length);
    }

    this.row = new Array(this.length);
    for(let i = 0; i < this.length; i++){
      this.row[i] = new Array(this.length);
    }

    let k = 0;
    let arr = new Array();
    for (let i = 0; i < this.col.length; i++) {
      arr = new Array();
      for (let j = 0; j < this.col.length; j++) {
        arr.push(form.roads[k]);
        k++;
      }
      this.array.push(arr);
    }

    let ans = this.minJumps(0, 0, this.array);
    if(ans <= form.jumps){
      this.ans = "Síp";
    } else{
      this.ans = "Nope"
    }
    this.matriz = this.array;
    this.array = new Array();
  }

  minJumps(i: number, j: number, arr: any){
    if (i == this.length - 1 && j == this.length - 1){
      return 0;
    }

    if (i > this.length - 1 || j > this.length - 1){
      return 9999999;
    }

    if (this.col[i][j] === "."){
      return this.row[i][j];
    }

    this.col[i][j] = ".";

    let valida = arr[i][j] === '.' ? 1 : 2; 
    this.row[i][j] = 1 + Math.min(this.minJumps(i +
    valida, j, arr), this.minJumps(i, j + valida, arr));

    return this.row[i][j];
  }

}
