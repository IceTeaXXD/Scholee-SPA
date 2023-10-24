import React from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  extendTheme,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('blue.100', 'blue.700');
  const buttonColor = useColorModeValue('blue.400', 'blue.300');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="text"
            variant="filled"
            mb={3}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            variant="filled"
            mb={3}
          />
        </FormControl>
        <Button bg={buttonColor} mb={8} >
          Log In
        </Button>
        <FormControl display="flex" alignItems="center" mb="3">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            color={buttonColor}
            size="lg"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Don't have an account? <a href="/register">Register</a>
          </FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;