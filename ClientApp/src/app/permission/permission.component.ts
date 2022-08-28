import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
import { Pagination } from '../models/pagination.model';
import { Permission } from '../models/permission.model';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {


  // Make a variable reference to our Enum
  formMode = FormMode;

  public permissions?: Permission[];
  public search: string="";
  public pagination: Pagination = new Pagination(1,0,10,[10,20]);
  public mode: FormMode = FormMode.table;
  public order: boolean = false;
  public permissionForEdit: Permission;
  public permissionForView: Permission;
  closeResult: string = '';

  constructor(http: HttpClient, private service: SharedService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }


  refreshList() {
    this.service.getAllPermissionsForPagination(this.pagination,this.search).subscribe(result => {
      this.permissions = result.items;
      this.pagination.count = result.count;
    })
  }

  onAdd() {
    this.mode = FormMode.create;
  }
  onEdit(permission: Permission) {
    this.permissionForEdit = permission;
    this.mode = FormMode.edit;
  }

  onView(permission: Permission) {
    this.permissionForView = permission;
    this.mode = FormMode.view;
  }
  onDelete(permission: Permission,content : any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.service.deletePermmision(permission.id).subscribe(result => {
        this.toastr.success(result,'Success');
        this.refreshList();
      }, error => console.error(error));
    },error => {})
  }

  public changeMode(mode: FormMode): void {
    if (this.mode == FormMode.create || this.mode == FormMode.edit) {
      this.refreshList();
    }
    this.mode = mode;
  }
  onPageChange($event){
    this.pagination.page = $event;
    this.refreshList();
  }
  onPageSizeChange($event){
    this.pagination.pageSize = $event.target.value;
    this.pagination.page = 1;
    this.refreshList();
  }
  sortNumber(columnName: any) {
    this.order = !this.order;
    if (this.order) {
      let newArr = this.permissions?.sort((a, b) => a[columnName] - b[columnName]);
      this.permissions = newArr;
    } else {
      let newArr = this.permissions?.sort((a,b) => b[columnName] - a[columnName]);
      this.permissions = newArr;
    }
  }
  sortString(columnName: any){
    this.order = !this.order;

    if(this.order){
      this.permissions?.sort((a,b) => (a[columnName] > b[columnName] ? -1 : 1));
    }else{
      this.permissions?.sort((a,b) => (b[columnName] > a[columnName] ? -1 : 1));
    }
  }
  searchMethod(){
    this.refreshList();
  }
}
