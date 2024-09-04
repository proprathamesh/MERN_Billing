import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Context } from '../context/context';
import {BillTemplateProps} from '../types/bill';
import {profileTemplate} from '../types/profile';
import BillCar from '../assets/billImages/BillCar.png'

interface MainProps {
    billingDetails: BillTemplateProps;
}

const Main: React.FC<MainProps> = ({billingDetails}) => {
    const billRef = useRef<HTMLDivElement>(null);
    const { defaultUrl } = Context();

    const [user, setUser] = useState<profileTemplate | null>();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }
            const config = {
                headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'application/json',
                },
            };
            const response = await axios.get(`${defaultUrl}/api/profile/profile`, config);
            setUser(response.data)
        }

        fetchUser();
    }, [])

    const generatePDF = async (elementRef: React.RefObject<HTMLDivElement>) => {
        if (elementRef.current) {
            try {
                // Convert the element to a canvas
                const canvas = await html2canvas(elementRef.current, {
                    scale: 3, // Scaling factor for better resolution
                    useCORS: true, // Allows cross-origin images
                });
        
                // Get the image data from the canvas
                const imgData = canvas.toDataURL('image/png');
        
                // Initialize jsPDF
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });
        
                // Calculate the dimensions of the PDF
                const pdfWidth = 210; // A4 page width in mm
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
                // Add the image to the PDF
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
                // Save the PDF
                pdf.save('bill.pdf');
            } catch (error) {
                console.error('Failed to generate PDF', error);
            }
        } else {
            console.error('Element reference is null.');
        }
    };

    return (
        <div>
            <div ref={billRef} className="w-[595px] h-[842px] relative bg-white">
                <div className='bg-[#3388FF] p-5 pb-1 text-white text-center'>
                    <div className=' flex justify-evenly items-center'>
                        <div className='me-3'>
                            <img className='rounded-full w-[80px] h-[80px]' src={`${defaultUrl}/${user?.profilePicture}`} alt="" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>{user?.companyName}</h1>
                            <h2 className='pt-3 text-xs'>All types of AC/Non AC car available on rent for 24 hours</h2>
                        </div>
                    </div>
                    <hr className='mt-3' />
                    <h1 className='text-xs pb-2'>{user?.address}</h1>
                </div>

                <div className='px-5 pb-2 flex justify-between items-center text-xs'>
                    <div><span className='font-bold'>Bill No:</span> 1234</div>
                    <div><span className='font-bold'>Date:</span> 2024-08-13</div>
                </div>

                <div className='px-5 py-1 text-xs flex'>
                    <div className='w-1/2'>
                        <div className='text-lg text-[#3388FF] font-semibold'>Customer Details</div>
                        <div className='py-1'><span className='font-bold'>Customer Name: </span>{billingDetails.name}</div>
                        <div className='py-1'><span className='font-bold'>Mobile No: </span>{billingDetails.mobile}</div>
                    </div>
                    <div className='ps-2'>
                        <div className='text-lg text-[#3388FF] font-semibold'>Driver Details</div>
                        <div className='py-1'><span className='font-bold'>Driver Name: </span> {billingDetails.driverName}</div>
                        <div className='py-1'><span className='font-bold'>Vehicle No: </span> {billingDetails.carId?.number}</div>
                        <div className='py-1'><span className='font-bold'>Type of Vehicle: </span> {billingDetails.carId.model}</div>
                    </div>
                </div>

                <div className='px-5 py-1 text-xs flex'>
                    <div className='w-1/2'>
                        <div className='text-lg text-[#3388FF] font-semibold'>Trip Details</div>
                        <div className='py-1'><span className='font-bold'>Pickup Address: </span> {billingDetails.pickupAddress}</div>
                        <div className='py-1'><span className='font-bold'>Starting Km: </span>{billingDetails.startKm} Km</div>
                    </div>
                    <div className='ps-2 pt-7'>
                        <div className='py-1'><span className='font-bold'>Drop Address: </span> {billingDetails.dropAddress}</div>
                        <div className='py-1'><span className='font-bold'>Ending Km: </span> {billingDetails.endKm} Km</div>
                    </div>
                </div>

                <div className='px-5 py-1 text-xs'>
                    <div className='text-lg text-[#3388FF] font-semibold'>Charges</div>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold'>Outstation charges</div>
                                    <div className='pe-2'>Rs. {billingDetails.rate}</div>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold'>Total Km</div>
                                    <div className='pe-2'>{billingDetails.endKm - billingDetails.startKm} Km</div>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold'>Toll Charges</div>
                                    <div className='pe-2'>Rs. {billingDetails.toll}</div>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold'>Parking</div>
                                    <div className='pe-2'>Rs. {billingDetails.parking}</div>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <div className='ps-4'>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold '>Days</div>
                                    <div>{billingDetails.days}</div>
                                </div>
                                <hr />
                            </div>
                            <div className='ps-4'>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold '>Drivers Food</div>
                                    <div>Rs. {billingDetails.foodCharges}</div>
                                </div>
                                <hr />
                            </div>
                            <div className='ps-4'>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold '>Overtime</div>
                                    <div>Rs. {billingDetails.overtime}</div>
                                </div>
                                <hr />
                            </div>
                            <div className='ps-4'>
                                <div className='flex justify-between py-2'>
                                    <div className='font-bold '>Advance payment</div>
                                    <div>Rs. {billingDetails.overtime}</div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex px-5'>
                    <div className='w-2/5'>
                        <img className='w-full my-3 pt-1' src={BillCar} alt="" />
                    </div>
                    <div className='w-3/5 text-lg text-[#3388FF] font-semibold text-right'>Amount to be Paid: Rs. {billingDetails.days*(billingDetails.rate + billingDetails.foodCharges + billingDetails.haltCharges) + billingDetails.overtime + billingDetails.toll + billingDetails.parking}</div>
                </div>

                <div className='px-6 py-4 flex'>
                    <div className='w-1/2 flex justify-center items-center'>
                        <div>
                            <img className='w-[200px] h-[93px]' src={billingDetails.signature} alt="" />
                            <div className='text-center pt-4'>Customer Signature</div>
                        </div>
                    </div>
                    <div className='w-1/2 flex justify-center items-center'>
                        <div>
                            <img className='w-[200px] h-[93px]' src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Slanted_Signature.jpg?v=1680536859" alt="" />
                            <div className='text-center pt-4'>Authorised Signature</div>
                        </div>
                    </div>
                </div>

                <div className='bg-[#3388FF] w-full mt-3'>
                    <div className='text-center text-white my-1 pb-2'>Thank you for choosing our taxi service!</div>
                </div>
            </div>
            <Button onClick={() => {generatePDF(billRef)}}>Download Bill</Button>
        </div>

    );
};

export default Main;
