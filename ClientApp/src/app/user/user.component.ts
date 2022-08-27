import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/SharedService.service';
import { FormMode } from '../enum/formMode.enum';
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
  public order: boolean = false;
  public userForEdit: User;
  public userForView: User;
  
  constructor(http: HttpClient, private service: SharedService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getAllUsers().subscribe(result => {
      this.users = result;
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
  }
  onDelete(user: User,content : any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.service.deleteUser(user.id).subscribe(result => {
        this.toastr.success(result,'Success');
        this.refreshList();
      }, error => console.error(error));
    })
  }

  public changeMode(mode: FormMode): void {
    if (this.mode == FormMode.create || this.mode == FormMode.edit) {
      this.refreshList();
    }
    this.mode = mode;
  }

}
