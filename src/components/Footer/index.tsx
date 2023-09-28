import '@umijs/max';
import {DefaultFooter} from "@ant-design/pro-layout";
import {GithubOutlined} from "@ant-design/icons";
import React from "react";

const Footer: React.FC = () => {
  const defaultMessage = '炳忠出品 必是精品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'ooip',
          title: '不用十年',
          href: 'https://github.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/',
          blankTarget: true,
        },
        {
          key: 'ooi',
          title: '只要三年',
          href: 'https://github.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
