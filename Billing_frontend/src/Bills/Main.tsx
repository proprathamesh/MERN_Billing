import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {BillTemplateProps} from '../types/bill'
import { Button } from 'antd';
// import 'antd/dist/antd.min.css'; // Updated path for Ant Design styles

interface MainProps {
    billingDetails: BillTemplateProps;
}

const Main: React.FC<MainProps> = ({billingDetails}) => {
    console.log(billingDetails)
    const billRef = useRef<HTMLDivElement>(null);

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
                <div className="w-[595px] h-[119px] left-0 top-0 absolute">
                    <div className="w-[595px] h-[119px] left-0 top-0 absolute bg-[#1a73e8]" />
                    <div className="w-[79px] h-[79px] left-[39px] top-[20px] absolute bg-[#d9d9d9] rounded-full" />
                    <div className="left-[143px] top-[29px] absolute text-white text-3xl font-normal font-['Jacques Francois']">Prathamesh Tours & Travels</div>
                    <div className="left-[144px] top-[79px] absolute text-white text-[15px] font-normal font-['Jacques Francois']">All types of AC/Non AC car available on rent for 24 hours</div>
                </div>
                <div className="w-[595px] h-[25px] left-0 top-[119px] absolute">
                    <div className="w-[192.14px] h-[15.26px] left-[200.53px] top-[4.87px] absolute">
                    </div>
                </div>
                <div className="w-[595px] h-[25px] px-[30px] left-0 top-[144px] absolute justify-between items-center inline-flex">
                    <div className="w-[77px] h-[17px] relative">
                        <div className="left-0 top-0 absolute text-black text-sm font-bold font-['Amaranth']">Bill No:</div>
                        <div className="left-[50px] top-0 absolute text-black text-sm font-normal font-['Amaranth']">1234</div>
                    </div>
                    <div className="w-[94px] h-[17px] relative">
                        <div className="left-0 top-0 absolute text-black text-sm font-bold font-['Amaranth']">Date:</div>
                        <div className="left-[40px] top-0 absolute text-black text-sm font-normal font-['Amaranth']">01/02/24</div>
                    </div>
                </div>
                <div className="left-[30px] top-[396px] absolute text-[#1a73e8] text-lg font-bold font-['Amiko']">Charges</div>
                <div className="w-[297.50px] h-[232px] left-0 top-[568px] absolute">
                    <div className="w-[297.50px] h-[116px] left-0 top-[116px] absolute bg-white" />
                    <div className="w-[297.50px] h-[116px] left-0 top-0 absolute bg-white" />
                </div>
                <div className="w-[595px] h-[42px] left-0 top-[800px] absolute">
                    <div className="w-[595px] h-[42px] left-0 top-0 absolute bg-[#1a73e8]" />
                    <div className="left-[131px] top-[9px] absolute text-white text-lg font-normal font-['Jacques Francois']">Thank you for choosing our taxi service!</div>
                </div>
                <div className="w-[298px] h-[116px] left-[297px] top-[684px] absolute">
                    <div className="w-[297.50px] h-[116px] left-0 top-0 absolute bg-white" />
                    <div className="w-[298px] left-0 top-[85px] absolute text-center text-black text-sm font-normal font-['Amiko']">Authorised Signature</div>
                </div>
                <div className="w-[595px] px-[30px] left-0 top-[169px] absolute bg-white justify-between items-center inline-flex">
                    <div className="w-[267px] h-[127px] relative">
                    <div className="w-[267px] h-[127px] left-0 top-0 absolute bg-white" />
                    <div className="w-[267px] h-[127px] left-0 top-0 absolute bg-white" />
                    <div className="w-[182px] h-[15.88px] left-0 top-[37.26px] absolute">
                        <div className="w-[45px] h-[15.88px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Name: </div>
                        <div className="w-[auto] h-[15.88px] left-[53px] top-0 absolute text-black text-sm font-normal font-['Amiko']">{billingDetails.name}</div>
                    </div>
                    <div className="w-36 h-[15.88px] left-0 top-[63.98px] absolute">
                        <div className="w-[52px] h-[15.88px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Mobile: </div>
                        <div className="w-[87px] h-[15.88px] left-[57px] top-0 absolute text-black text-sm font-normal font-['Amiko']">8767370132</div>
                    </div>
                    <div className="w-[155px] h-[20.05px] left-0 top-[5.01px] absolute text-[#1a73e8] text-lg font-bold font-['Amiko']">Customer Details</div>
                    </div>
                    <div className="w-[267px] h-[127px] relative">
                    <div className="w-[267px] h-[127px] left-0 top-0 absolute bg-white" />
                    <div className="w-[267px] h-[127px] left-0 top-0 absolute bg-white" />
                    <div className="w-[182px] h-[15.88px] left-0 top-[36.26px] absolute">
                        <div className="w-[45px] h-[15.88px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Name: </div>
                        <div className="w-[129px] h-[15.88px] left-[53px] top-0 absolute text-black text-sm font-normal font-['Amiko']">Prathamesh Yadav</div>
                    </div>
                    <div className="w-[184px] h-[15.88px] left-0 top-[63.98px] absolute">
                        <div className="w-[79px] h-[15.88px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Vehicle No: </div>
                        <div className="w-[102px] h-[15.88px] left-[82px] top-0 absolute text-black text-sm font-normal font-['Amiko']">MH41AM3099</div>
                    </div>
                    <div className="w-[188px] h-[15.88px] left-0 top-[92.54px] absolute">
                        <div className="w-[89px] h-[15.88px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Vehicle type: </div>
                        <div className="w-24 h-[15.88px] left-[92px] top-0 absolute text-black text-sm font-normal font-['Amiko']">Innova Crysta</div>
                    </div>
                    <div className="w-[122px] h-[20.05px] left-0 top-[5.01px] absolute text-[#1a73e8] text-lg font-bold font-['Amiko']">Driver Details</div>
                    </div>
                </div>
                <div className="w-[297.50px] h-[116px] left-[297px] top-[568px] absolute">
                    <div className="w-[297.50px] h-[116px] left-0 top-0 absolute bg-white" />
                    <div className="w-[267px] left-[1px] top-[24px] absolute text-right text-[#1a73e8] text-lg font-bold font-['Amiko']">Amount Paid: Rs. 15900</div>
                </div>
                <div className="w-[595px] h-[98px] left-[1px] top-[289px] absolute">
                    <div className="w-[595px] h-[98px] left-0 top-0 absolute bg-white" />
                    <div className="w-[267px] h-[98px] left-[29px] top-0 absolute">
                    <div className="w-[93px] h-[14.90px] left-0 top-[42.71px] absolute">
                        <div className="w-[51px] h-[14.90px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Pickup:</div>
                        <div className="w-9 h-[14.90px] left-[57px] top-0 absolute text-black text-sm font-normal font-['Amiko']">Pune</div>
                    </div>
                    <div className="w-[133px] h-[14.90px] left-0 top-[69.66px] absolute">
                        <div className="w-[87px] h-[14.90px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Starting Km:</div>
                        <div className="w-[41px] h-[14.90px] left-[92px] top-0 absolute text-black text-sm font-normal font-['Amiko']">20Km</div>
                    </div>
                    <div className="w-[155px] h-[15.47px] left-0 top-[8.62px] absolute text-[#1a73e8] text-lg font-bold font-['Amiko']">Trip Details</div>
                    </div>
                    <div className="w-[267px] h-[98px] left-[299px] top-0 absolute">
                        <div className="w-[82px] h-[14.90px] left-0 top-[41.71px] absolute">
                            <div className="w-[39px] h-[14.90px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Drop:</div>
                            <div className="w-9 h-[14.90px] left-[46px] top-0 absolute text-black text-sm font-normal font-['Amiko']">Pune</div>
                        </div>
                        <div className="w-[138px] h-[14.90px] left-0 top-[68.66px] absolute">
                            <div className="w-[79px] h-[14.90px] left-0 top-0 absolute text-black text-sm font-bold font-['Amiko']">Ending Km:</div>
                            <div className="w-[50px] h-[14.90px] left-[88px] top-0 absolute text-black text-sm font-normal font-['Amiko']">200Km</div>
                        </div>
                    </div>
                </div>
                <div className="w-[595px] h-[0px] left-[595px] top-[115px] absolute origin-top-left rotate-[179.90deg] border border-white"></div>
                <div className="w-[268px] h-[149px] left-[30px] top-[420px] absolute">
                    <div className="w-[267px] h-[148px] left-0 top-[1px] absolute flex-col justify-center items-center inline-flex">
                        <div className="w-[264px] h-[37px] relative">
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Outstation Charges</div>
                            <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                        </div>
                        <div className="w-[264px] h-[37px] relative">
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Total Km</div>
                            <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">300 Km</div>
                        </div>
                        <div className="w-[264px] h-[37px] relative">
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Toll Charges</div>
                            <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                        </div>
                        <div className="w-[264px] h-[37px] relative">
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                            <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Parking</div>
                            <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                        </div>
                    </div>
                </div>
                <div className="h-[148px] left-[298px] top-[420px] absolute flex-col justify-center items-center inline-flex">
                    <div className="w-[264px] h-[37px] relative">
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Days</div>
                        <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                    </div>
                    <div className="w-[264px] h-[37px] relative">
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Overtime</div>
                        <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">300 Km</div>
                    </div>
                    <div className="w-[264px] h-[37px] relative">
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Drivers Food</div>
                        <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                    </div>
                    <div className="w-[264px] h-[37px] relative">
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="w-[264px] h-[37px] left-0 top-0 absolute bg-white" />
                        <div className="left-0 top-[11px] absolute text-black text-sm font-bold font-['Amiko']">Advance</div>
                        <div className="left-[182px] top-[11px] absolute text-black text-sm font-normal font-['Amiko']">Rs. 3000</div>
                    </div>
                </div>
            </div>
            <Button onClick={() => {generatePDF(billRef)}}>Download Bill</Button>
        </div>

    );
};

export default Main;
