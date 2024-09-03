import { carTemplate } from '../types/car';

export interface BillTemplateProps {
    uid: string,
    date: string,
    name: string,
    mobile: string,
    driverName: string,
    carId: carTemplate,
    pickupAddress: string,
    dropAddress: string,
    startKm: number,
    endKm: number,
    signature: string,
    rate: number,
    toll: number,
    parking: number,
    days: number,
    overtime: number,
    foodCharges: number,
    haltCharges: number,
    advance: number,
    amount: number,
}