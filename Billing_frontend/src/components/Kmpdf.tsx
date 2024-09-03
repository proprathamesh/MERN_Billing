import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './TaxiBill.css';
import axios from 'axios';

interface TaxiBillProps {
  compName: string;
  compAdd: string;
  bill: string;
  date: string;
  name: string;
  mobile: string;
  dName: string;
  cNo: string;
  cName: string;
  pAdd: string;
  skm: string;
  dAdd: string;
  ekm: string;
  rate: string;
  toll: string;
  parking: string;
  over: string;
  stay: string;
  advance: string;
  amount: string;
  signUrl: string;
}

interface ProfileData {
  compName: string;
  compAdd: string;
}

interface CarData {
  cNo: string;
  cName: string;
}

const TaxiBill: React.FC<TaxiBillProps> = ({
  bill,
  date,
  name,
  mobile,
  dName,
  pAdd,
  skm,
  dAdd,
  ekm,
  rate,
  toll,
  parking,
  over,
  stay,
  advance,
  amount,
  signUrl
}) => {

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [carData, setCarData] = useState<CarData | null>(null);

  useEffect(() => {
    // Fetch profile data
    axios.get('/api/profile') // replace with your profile API endpoint
      .then((response: any) => setProfileData(response.data))
      .catch(error => console.error('Error fetching profile data:', error));

    // Fetch car data
    axios.get('/api/car') // replace with your car API endpoint
      .then(response => setCarData(response.data))
      .catch(error => console.error('Error fetching car data:', error));
  }, []);


  const generatePDF = () => {
    const input = document.getElementById('billContent')!;
    html2canvas(input).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("taxi_bill.pdf");
    });
  };

  return (
    <div>
      <div id="billContent" className="bill-container">
        <div className="bill-header">
          <div className="header-content">
            <div className="logo-container">
              <img
                src="https://billgenie.in/Partials/CompanyLogo.jpeg"
                width="100px"
                style={{ borderRadius: '50%' }}
                alt=""
              />
            </div>
            <div className="company-head">
              <h1>{profileData?.compName}</h1>
              <p>All types of AC/Non AC car available on rent for 24 hours</p>
            </div>
          </div>
          <hr />
          <p className="company-address">{profileData?.compAdd}</p>
        </div>
        <div className="bill-date">
          <p className="bill-no">
            <strong>Bill No: </strong>{bill}
          </p>
          <p className="bill-date-content">
            <strong>Date: </strong>{date}
          </p>
        </div>
        <div className="trip-details">
          <div className="customer-details">
            <h3>Customer Details</h3>
            <p><strong>Customer Name: </strong>{name}</p>
            <p><strong>Mobile No: </strong>{mobile}</p>
          </div>
          <div className="driver-details">
            <h3>Driver Details</h3>
            <p><strong>Driver Name: </strong>{dName}</p>
            <p><strong>Vehicle No: </strong>{carData?.cNo}</p>
            <p><strong>Type of Vehicle: </strong>{carData?.cName}</p>
          </div>
        </div>
        <div className="trip-details">
          <h3>Trip Details</h3>
          <div className="pickup-details">
            <p><strong>Pickup Address: </strong>{pAdd}</p>
            <p><strong>Starting Km: </strong>{skm}</p>
          </div>
          <div className="drop-details">
            <p><strong>Drop Address: </strong>{dAdd}</p>
            <p><strong>Ending Km: </strong>{ekm}</p>
          </div>
        </div>
        <div className="itemized-charges">
          <h3>Charges</h3>
          <div className="charges-table">
            <table>
              <tbody>
                <tr>
                  <td>Outstation Charge</td>
                  <td>Rs. {rate}</td>
                </tr>
                <tr>
                  <td>Total Km</td>
                  <td>{parseInt(ekm) - parseInt(skm)} Km</td>
                </tr>
                <tr>
                  <td>Toll Charges</td>
                  <td>Rs. {toll}</td>
                </tr>
                <tr>
                  <td>Parking</td>
                  <td>Rs. {parking}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>Overtime</td>
                  <td>Rs. {over}</td>
                </tr>
                <tr>
                  <td>Drivers Food</td>
                  <td>Rs. {stay}</td>
                </tr>
                <tr>
                  <td>Advance payment</td>
                  <td>Rs. {advance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="total-amount-section">
          <div className="car-image">
            <img
              src="https://billgenie.in/Partials/carpic.png"
              width="300px"
              alt=""
              style={{ marginTop: '22px', marginLeft: '50px', mixBlendMode: 'multiply' }}
            />
            <div className="signature">
              <img
                src={signUrl}
                width="200px"
                height="90px"
                alt=""
                style={{ marginRight: '55px', marginLeft: '50px', mixBlendMode: 'multiply', marginTop: '25px' }}
              />
              <p style={{ marginRight: '70px' }}>Customer Signature</p>
            </div>
          </div>
          <div className="amount-signature">
            <div className="total-amount">
              <h3>Amount to be Paid: Rs. {amount}</h3>
            </div>
            <div className="signature">
              <img
                src="https://billgenie.in/Partials/stamp.png"
                width="200px"
                height="90px"
                alt=""
                style={{ marginRight: '55px', marginLeft: '50px', mixBlendMode: 'multiply', marginTop: '100px' }}
              />
              <p style={{ marginRight: '70px' }}>Authorised Signature</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Thank you for choosing our taxi service!</p>
        </div>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default TaxiBill;
