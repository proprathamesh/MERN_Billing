import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Main from '../Bills/Main'
import { BillTemplateProps } from '../types/bill';
import axios from 'axios';
import { Context } from '../context/context';
import { message } from 'antd';

const KmBill: React.FC = () => {
    const { billId } = useParams();
    const { defaultUrl } = Context();

    console.log(billId)
    
    const [billData, setBillData] = useState<BillTemplateProps | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
        
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
              const response = await axios.get(`${defaultUrl}/api/km/${billId}`, config);
              setBillData(response.data)
            } catch (error) {
              message.error('Failed to import bill.');
              console.log(error);
            }
        };

        getData();
    }, [])

    return (
        <div className='flex justify-center'>
            {
                billData && <Main billingDetails={billData} />
            }
        </div>
    );
};

export default KmBill;
