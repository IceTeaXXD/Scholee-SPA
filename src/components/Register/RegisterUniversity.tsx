import { useState } from "react"
import { motion } from "framer-motion";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorMode,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  IconButton,
  Box,
  Image,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import axios from "../../api/axios"
import { redirect } from "react-router-dom"
import { FaSun, FaMoon } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/axiosPrivate";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
const PWD_REGEX = /^(?=.*\d).{8,}$/
const REGISTER_URL = "/api/university"
// const navigate = useNavigate();
const RegisterUni = () => {
  const axiosInstance = useAxiosPrivate()
  const [showPassword, setShowPassword] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const formBackground = useColorModeValue("white", "gray.800")
  const buttonColor = useColorModeValue("gray.800", "white")
  const textColor = useColorModeValue("gray.800", "white")

  // NAMA
  const [name, setName] = useState("")
  // EMAIL
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [validPwd, setValidPwd] = useState(true)
  // PASSWORD
  const [password, setPassword] = useState("")
  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(true)
  // ADDRESS
  const [address, setAddress] = useState("")

  // ORGANIZATION DESC
  const [universityDescription, setuniversityDescription] = useState("")

  const [errMsg, setErrMsg] = useState("")

  const handleSubmit = async (e: any) => {
    console.log("SUBMIT")
    e.preventDefault()
    // check if there are some empty fields
    if (
      !name ||
      !email ||
      !password ||
      !matchPwd ||
      !address ||
      !universityDescription
    ) {
      setErrMsg("Please fill all fields")
      return
    }
    // check if email is valid
    if (!validEmail) {
      setErrMsg("Invalid email address")
      return
    }
    // check if password is valid
    if (!validPwd) {
      setErrMsg("Password must contain at least 8 character and 1 number")
      return
    }
    // check if password match
    if (!validMatch) {
      setErrMsg("Password did not match")
      return
    }
    try {
      const response = await axiosInstance.post(
        REGISTER_URL,
        {
          name: name,
          email: email,
          password: password,
          address: address,
          universityDescription: universityDescription,
        },
        {
          headers: { "X-API-KEY": "kunciT", "Content-Type": "application/json" }
        }
      )
      setShowSuccessMessage(true);
      setName("")
      setEmail("")
      setPassword("")
      setMatchPwd("")
      setAddress("")
      setuniversityDescription("")
    } catch (err: any) {
      if (!err.response) {
        setErrMsg("No server response")
      } else if (err.request) {
        setErrMsg("")
      } else {
        setErrMsg("")
      }
    }
  }
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Flex h="100vh">
        {/* FORM */}
        <Flex
          flexDirection="column"
          w={{ base: "100%", md: "50%" }}
          maxW="1000px"
          rounded={6}
          bg={formBackground}
          p={12}
        >
          <Heading mb={6}>Register University</Heading>
          <Box
            color="red.500"
            display={errMsg ? "block" : "none"}
            fontWeight="bold"
            fontSize="sm"
            aria-live="assertive"
          >
            {errMsg}
          </Box>
          {showSuccessMessage && (
            <Alert status="success" mb={6}>
              <AlertIcon />
              Registration successful! You can now log in.
            </Alert>
          )}
          <FormControl variant="floating" id="name" isRequired mb={6}>
            <Input
              placeholder=" "
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel bg={formBackground}>Name </FormLabel>
          </FormControl>
          <FormControl variant="floating" id="email" isRequired isInvalid={!validEmail} mb={6}>
            <Input
              placeholder=" "
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setValidEmail(EMAIL_REGEX.test(email))}
            />
            <FormLabel bg={formBackground}>Email</FormLabel>
            <FormErrorMessage>
              {!validEmail && "Invalid Email"}
            </FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired isInvalid={!validPwd} mb={6}>
            <InputGroup>
              <Input
                placeholder=" "
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setValidPwd(PWD_REGEX.test(password))}
                required
              />
              <FormLabel bg={formBackground}>Password</FormLabel>
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              Password must contain at least one digit and be a minimum of 8 characters long
            </FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="passwordConfirmation" isRequired isInvalid={!validMatch} mb={6}>
            <InputGroup>
              <Input
                placeholder=" "
                type={showPassword ? "text" : "password"}
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                onBlur={() => setValidMatch(password === matchPwd)}
                required
              />
              <FormLabel bg={formBackground}>Password Confirmation</FormLabel>
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              Password do not match
            </FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="name" isRequired mb={6}>
            <Input
              placeholder=" "
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormLabel bg={formBackground}>Address </FormLabel>
          </FormControl>
          <FormControl variant="floating" id="universityDescription" isRequired mb={6}>
            <Input
              placeholder=" "
              type="text"
              required
              value={universityDescription}
              onChange={(e) => setuniversityDescription(e.target.value)}
            />
            <FormLabel bg={formBackground}>Description </FormLabel>
          </FormControl>
          <Button bg={buttonColor} color={formBackground} _hover={{ bg: "gray.600", color: "gray.200" }} mb={8} onClick={handleSubmit}>
            Register
          </Button>
          <Box position="absolute" top="2" left="2">
            <IconButton
              aria-label="Toggle Dark Mode"
              icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
              color={buttonColor}
              onClick={toggleColorMode}
            />
          </Box>
          <FormControl>
            <FormLabel>
              Already have an account? <Link to="/login">Log In</Link>
            </FormLabel>
          </FormControl>
        </Flex>
        {/* IMAGE */}
        <Box
          display={{ base: "none", md: "block" }}
          alignItems="center"
          w={{ base: "0%", md: "50%" }}
          overflow="hidden"
        >
          <Image
            src="https://imageio.forbes.com/specials-images/imageserve/64e6668d9ed8aec53b4af6bf/The-University-of-California--Los-Angeles-campus-/0x0.jpg?format=jpg&height=1080&width=1080"
            h="100%"
            alt="Register"
          />
        </Box>
      </Flex>
    </motion.div>
  )
}

export default RegisterUni
