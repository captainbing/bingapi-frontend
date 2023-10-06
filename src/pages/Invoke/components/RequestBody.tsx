import { Col, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import FormData from "@/pages/Invoke/components/FormData";

const RequestBody = () => {
  /**
   * 单选框
   * @param e
   */
  const [value, setValue] = useState('none');
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    if (e.target.value === 4) {
      setRaw(true);
    } else {
      setRaw(false);
    }
    setValue(e.target.value);
  };

  /**
   * 复选框
   */
  const [isRaw, setRaw] = useState(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={'none'}>none</Radio>
            <Radio value={'form-data'}>form-data</Radio>
            <Radio value={'x-www-form-urlencoded'}>x-www-form-urlencoded</Radio>
            <Radio value={'raw'}>raw</Radio>
            <Radio value={'binary'}>binary</Radio>
            <Radio value={'GraphQL'}>GraphQL</Radio>
          </Radio.Group>
          {isRaw && (
            <Select
              defaultValue="Text"
              style={{ width: 100 }}
              bordered={false}
              onChange={handleChange}
              options={[
                { value: 'Text', label: 'Text' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: 'JSON', label: 'JSON' },
                { value: 'HTML', label: 'HTML' },
                { value: 'XML', label: 'XML' },
              ]}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {value === 'none' && 'none'}
          {value === 'form-data' && <FormData/>}
          {value === 'x-www-form-urlencoded' && 'x-www-form-urlencoded'}
          {value === 'raw' && 'raw'}
          {value === 'binary' && 'binary'}
          {value === 'GraphQL' && 'GraphQL'}
        </Col>
      </Row>
    </>
  );
};

export default RequestBody;
