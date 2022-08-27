import { Permission } from "./permission.model";
import { User } from "./user.model";

export class UserPermission {
    id: number;
    user: User;
    permission: Permission;
}
