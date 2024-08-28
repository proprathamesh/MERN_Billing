import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, message, DatePicker, Row, Col, Select, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import SignatureCanvas from 'react-signature-canvas';
import { Context } from '../context/context';

const { Option } = Select;

const BillingFormPage = () => {

  const { defaultUrl } = Context();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [signature, setSignature] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }
        const response = await axios.get(`${defaultUrl}/api/car/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCars(response.data);
      } catch (error) {
        message.error('Failed to fetch cars.');
      }
    };

    // Check if user is authenticated
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
          // Include token in the request headers
          axios.defaults.headers.common['Authorization'] = `${token}`;
          await axios.get(`${defaultUrl}/api/protected`);
          setAuthenticated(true);
        } else {
          navigate('/auth');
        }
      } catch (error) {
        navigate('/auth');
      }
    };

    fetchCars();
    checkAuthentication();
  }, [navigate]);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (sigCanvas.current) {
      setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Convert numeric values to numbers
      const numericFields = ['advance', 'rate', 'toll', 'parking', 'amount', 'startKm', 'endKm', 'haltCharges', 'foodCharges', 'overtime'];
      numericFields.forEach(field => {
        if (!isNaN(values[field])) {
          values[field] = parseFloat(values[field]);
        }
      });

      // Convert date field to a Date object
      values.date = moment(values.date).toDate();

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const signature = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
      const config = {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(`${defaultUrl}/api/km/`, { ...values, signature }, config);
      navigate(`/billkm/${response.data._id}`)
      message.success('Billing submitted successfully!');
      setLoading(false);
    } catch (error) {
      message.error('Failed to submit billing.');
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl mb-4">Billing Form</h1>
      {authenticated && (
        <Form
          name="billingForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[{ required: true, message: 'Please input your mobile number!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Pickup Address"
                name="pickupAddress"
                rules={[{ required: true, message: 'Please input pickup address!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Drop Address"
                name="dropAddress"
                rules={[{ required: true, message: 'Please input drop address!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Driver Name"
                name="driverName"
                rules={[{ required: true, message: 'Please input driver name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Car"
                name="carId"
                rules={[{ required: true, message: 'Please select car ID!' }]}
              >
                <Select>
                  {cars.map((car: any) => (
                    <Option key={car._id} value={car._id}>
                      {car.model} ({car.number})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Rate"
                name="rate"
                rules={[{ required: true, message: 'Please input rate!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Toll"
                name="toll"
                rules={[{ required: true, message: 'Please input toll!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Parking"
                name="parking"
                rules={[{ required: true, message: 'Please input parking!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Advance"
                name="advance"
                rules={[{ required: true, message: 'Please input advance!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Start Km"
                name="startKm"
                rules={[{ required: true, message: 'Please input start km!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="End Km"
                name="endKm"
                rules={[{ required: true, message: 'Please input end km!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Halt Charges"
                name="haltCharges"
                rules={[{ required: true, message: 'Please input halt charges!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Food Charges"
                name="foodCharges"
                rules={[{ required: true, message: 'Please input food charges!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Overtime"
                name="overtime"
                rules={[{ required: true, message: 'Please input overtime!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col  xs={24} sm={12}>
              <Form.Item
                label="Signature"
                name="signature"
              >
                <div>
                  <Button onClick={showModal} type="primary">
                    Open Signature Pad
                  </Button>
                  {signature && (
                    <img
                      src={signature}
                      alt="Signature"
                      style={{ display: 'block', marginTop: '10px', border: '1px solid #ddd', padding: '5px', width: '100%', maxHeight: '200px' }}
                    />
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
      <Modal
        title="Signature Pad"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="clear" onClick={clearSignature}>
            Clear
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 1000, height: 400, className: 'sigCanvas' }}
        />
      </Modal>

    </div>
  );
};

export default BillingFormPage;
