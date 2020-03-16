export interface IData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
    };
    description?: string;
}

export interface ISort {
    key: string;
    order: boolean;
}

export interface IPagination {
    size: number;
    page: number;
}

export interface IDataPage {
    list: IData[];
    total: number;
}
