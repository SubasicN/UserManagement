import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
import { Pagination } from '../models/pagination.model';
import { Permission } from '../models/permission.model';
import { User } from '../models/user.model';
import { UserPermission } from '../models/userPermission';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  title: string;
  formMode = FormMode;
  public mode: FormMode = FormMode.table;
  public permissions?: Permission[];
  public pagination: Pagination = new Pagination(1, 0, 10, [10, 20]);
  public order: boolean = false;
  public userPermissions?: UserPermission[];
  public userPermissionForEdit: UserPermission;
  public userPermissionForAdd: UserPermission;
  public search:string = "";
  @Input() user: User;
  @Input() modeForAssign: FormMode;

  constructor(private route: ActivatedRoute,private service: SharedService, private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPermissionsForUser();

    if(this.modeForAssign == this.formMode.create){
      this.onAdd();
    }

  }

  getPermissionsForUser() {
    this.service.getPermissionForUserWithPagination(this.user.id,this.pagination,this.search).subscribe(result => {
      this.userPermissions = result.items;
      this.pagination.count = result.count;
    })
  }
  onAdd() {
    this.mode = FormMode.create;
    this.userPermissionForAdd = new UserPermission();
    this.userPermissionForAdd.user = this.user;
  }
  onDelete(userPermission: UserPermission,content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.service.deleteUserPermission(userPermission.id).subscribe(result => {
        this.toastr.success(result,'Success');
        this.getPermissionsForUser();
      }, error => this.toastr.error(JSON.parse(error.error).Message,'Error'));
    },error => {});
  }
  onEdit(userPermission: UserPermission) {
    this.mode = FormMode.edit;
    this.userPermissionForEdit = userPermission;
  }
  public changeMode(mode: FormMode): void {
    if (this.mode == FormMode.create || this.mode == FormMode.edit) {
      this.getPermissionsForUser();
    }
    this.mode = mode;
  }
  onPageChange($event) {
    this.pagination.page = $event;
    this.getPermissionsForUser();
  }
  onPageSizeChange(event) {
    this.pagination.pageSize = event.target.value;
    this.pagination.page = 1;
    this.getPermissionsForUser();
  }
  sortNumber(columnName: any) {
    this.order = !this.order;
    if (this.order) {
      let newArr = this.userPermissions?.sort((a, b) => a[columnName] - b[columnName]);
      this.userPermissions = newArr;
    } else {
      let newArr = this.userPermissions?.sort((a,b) => b[columnName] - a[columnName]);
      this.userPermissions = newArr;
    }
  }
  sortString(columnName: any){
    this.order = !this.order;

    if(this.order){
      this.userPermissions?.sort((a,b) => (a.permission[columnName] > b.permission[columnName] ? -1 : 1));
    }else{
      this.userPermissions?.sort((a,b) => (b.permission[columnName] > a.permission[columnName] ? -1 : 1));
    }
  }
  searchMethod(){
    this.getPermissionsForUser();
  }
  

}
