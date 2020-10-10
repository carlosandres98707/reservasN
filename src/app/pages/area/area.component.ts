import { Component, OnInit,ViewChild } from '@angular/core';
import { Area } from "../../model/area";
import { AreaService } from "../../services/area.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import Swal from 'sweetalert2';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  public frmAreas: FormGroup;
  displayedColumns: string[]= ['idArea','nomArea'];
  areasrta: Area;
  areas=[];
  datasource = new MatTableDataSource();
  editable: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  constructor(private areaservice:AreaService, private formBuilder: FormBuilder)
  {
    this.frmAreas =  new FormGroup({})
   }

  ngOnInit(): void
  {
    this.frmAreas = this.formBuilder.group({

      nomArea: ['',Validators.required]
   })

   this.getAreas();
   this.editable = false;
  }

  getAreas()
  {
   this.areaservice.getAreas().subscribe(

  data=>{
  this.datasource= new MatTableDataSource(data.data.areas);
  this.datasource.paginator = this.paginator;
  this.areas= data.data.areas;
  }


   );
   console.log(this.areas)

  }

  sendData()
  {

    if(this.frmAreas.valid)
    {
     let obArea : any ={
       nomArea: "string"
     }
     obArea.nomArea = this.frmAreas.controls.nomArea.value;
     this.areaservice.insertarArea(obArea).subscribe(
       data =>{
         if(data.success)
         {
        this.getAreas();
        this.frmAreas.reset();
        this.swal('Registro correcto','success');
         }else{
          this.swal(data.messages[0],'error');
         }
       }
     ), error =>{
      this.swal(error,'error');
     }
    }
  }

  swal(mensaje,icon)
  {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    })
  }
  cancelar(){
    this.frmAreas.reset();
  }

}
