import React, { useState } from 'react';
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
  InputRightElement,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'; 


const Register = () => {
const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('blue.100', 'blue.700');
  const buttonColor = useColorModeValue('blue.400', 'blue.300');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Register</Heading>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            variant="filled"
            mb={3}
            required
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            variant="filled"
            mb={3}
            required
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              mb={6}
              required
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handlePasswordVisibility}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button bg={buttonColor} mb={8} >
          Register
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
            Already have an account? <Link to="/login">Log In</Link>
          </FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Register;