export class PageRequest<T> {
    count?: number;
    pageIndex?: number;
    pageSize?: number;
    items?: T[];

    constructor(count?: number, pageIndex?: number, pageSize?: number, items?: T[]){
        this.count = count,
        this.pageIndex = pageIndex,
        this.pageSize = pageSize,
        this.items = items
    }
}
