import {useRef, useState, useEffect} from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from '../../api/axios';
import {setAuthToken} from "../../utils/auth";

const LOGIN = '/api/login';
const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('blue.100', 'blue.700');
  const buttonColor = useColorModeValue('blue.400', 'blue.300');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post(LOGIN, {
        email,
        password,
      });
      if (res.status === 200) {
        console.log("Login Success")
        // console.log(res.data);
        setAuthToken(res.data.accessToken);
        if (res.data.role ==="university") {
          navigate("/home");
        } else {
          navigate("/home")
          // TODO : bedain antara uni dan org
        }
      }
      // navigate('/dashboard');
    } catch {
      setErrMsg('Invalid email or password');
    }
  }

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
        <Box
          color="red.500"
          display={errMsg ? 'block' : 'none'}
          mb={3}
          fontWeight="bold"
          fontSize="sm"
          aria-live="assertive"
        >
          {errMsg}
        </Box>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="text"
            variant="filled"
            mb={3}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            variant="filled"
            mb={3}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Link to="/dashboard">
          <Button bg={buttonColor} mb={8} onClick={handleSubmit}>
            Log In
          </Button>
        </Link>
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
            Don't have an account? <Link to="/register">Register</Link>
          </FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;