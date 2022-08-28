import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
import { Pagination } from '../models/pagination.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Make a variable reference to our Enum
  formMode = FormMode;

  public users?: User[];
  public mode: FormMode = FormMode.table;
  public modeForAssign: FormMode = FormMode.create;
  public pagination: Pagination = new Pagination(1,0,10,[10,20]);
  public order: boolean = false;
  public userForEdit: User;
  public userForView: User;
  
  constructor(private router:Router ,http: HttpClient, private service: SharedService,private toastr: ToastrService,private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getAllUsersForPagination(this.pagination).subscribe(result => {
      this.users = result.items;
      this.pagination.count = result.count;
    })
  }

  onAdd() {
    this.mode = FormMode.create;
  }
  onEdit(user: User) {
    this.userForEdit = user;
    this.mode = FormMode.edit;
  }

  onView(user: User) {
    this.userForView = user;
    this.mode = FormMode.view;
    this.modeForAssign = FormMode.view;
  }
  onAssign(user:User){
    this.userForView = user;
    this.mode = FormMode.view;
    this.modeForAssign = FormMode.create;
  }
  onDelete(user: User,content : any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.service.deleteUser(user.id).subscribe(result => {
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
  onPageSizeChange(event){
    this.pagination.pageSize = event.target.value;
    this.pagination.page = 1;
    this.refreshList();
  }

}
