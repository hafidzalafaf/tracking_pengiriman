export interface ResponseTracking {
    data: Data;
}

export interface Data {
    so_number:     string;
    order_date:    Date;
    delivery_date: Date;
    items:         Item[];
    total_payment: number;
    status:        string;
    driver:        Driver;
    vehicle:       Vehicle;
}

export interface Driver {
    name:         string;
    nip:          string;
    phone_number: string;
}

export interface Item {
    inventory_name: string;
    unit:           string;
    quantity_unit:  number;
    quantity_pcs:   number;
    unit_price: number;
    subtotal: number;
}

export interface Vehicle {
    name:          string;
    license_plate: string;
}