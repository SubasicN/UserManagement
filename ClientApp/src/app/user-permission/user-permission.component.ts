import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
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
  public userPermissions?: UserPermission[];
  public userPermissionForEdit: UserPermission;
  public userPermissionForAdd: UserPermission;
  @Input() user: User;

  constructor(private service: SharedService, private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPermissionsForUser();
  }

  getPermissionsForUser() {
    this.service.getPermissionForUser(this.user.id).subscribe(result => {
      this.userPermissions = result;
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
      }, error => console.error(error));
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
  

}
