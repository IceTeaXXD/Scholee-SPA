import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { FiMenu } from 'react-icons/fi';
const Dashboard = () => {
  return (
    <Flex w="100%">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>Dashboard Page</Text>
      </Flex>
    </Flex>
  );
};

export default Dashboard;