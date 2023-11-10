import { useState } from "react"
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
  InputRightElement,
  InputGroup,
  IconButton,
  Tooltip,
  Box
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import axios from "../../api/axios"
import { redirect } from "react-router-dom"

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
const PWD_REGEX = /^(?=.*\d).{8,}$/
const REGISTER_URL = "/api/organization"
// const navigate = useNavigate();
const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("blue.100", "blue.700")
  const buttonColor = useColorModeValue("blue.400", "blue.300")
  const textColor = useColorModeValue("gray.700", "gray.100")

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
  const [organizationDescription, setOrganizationDescription] = useState("")

  const [errMsg, setErrMsg] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // check if there are some empty fields
    if (
      !name ||
      !email ||
      !password ||
      !matchPwd ||
      !address ||
      !organizationDescription
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
      const response = await axios.post(
        REGISTER_URL,
        {
          name,
          email,
          password,
          address,
          organizationDescription
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      redirect("/login")
      setName("")
      setEmail("")
      setPassword("")
      setMatchPwd("")
      setAddress("")
      setOrganizationDescription("")
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
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="row"
        w="100%"
        maxW="1000px"
        boxShadow="dark-lg"
        rounded={6}
        bg={formBackground}
      >
        {/* FORM */}
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          w="100%"
        >
          <Heading mb={6}>Register</Heading>
          <Box
            color="red.500"
            display={errMsg ? "block" : "none"}
            mb={3}
            fontWeight="bold"
            fontSize="sm"
            aria-live="assertive"
          >
            {errMsg}
          </Box>
          <FormControl id="name" isRequired>
            <FormLabel>Name </FormLabel>
            <Input
              type="text"
              variant="filled"
              mb={3}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <Input
                type="email"
                variant="filled"
                mb={3}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setValidEmail(EMAIL_REGEX.test(email))}
              />
              <InputRightElement>
                {!validEmail && (
                  <Tooltip label="Invalid email address" placement="top">
                    <IconButton
                      aria-label="Email error"
                      icon={<WarningIcon />}
                      color="red.500"
                    />
                  </Tooltip>
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setValidPwd(PWD_REGEX.test(password))}
                variant="filled"
                mb={6}
                required
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                />
                {!validPwd && (
                  <Tooltip
                    label="Password must contain at least 8 character and 1 number"
                    placement="top"
                  >
                    <IconButton
                      aria-label="Email error"
                      icon={<WarningIcon />}
                      color="red.500"
                    />
                  </Tooltip>
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="passwordConfirmation" isRequired>
            <FormLabel>Password Confirmation</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                onBlur={() => setValidMatch(password === matchPwd)}
                variant="filled"
                mb={6}
                required
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                />
                {!validMatch && (
                  <Tooltip label="Password did not match" placement="top">
                    <IconButton
                      aria-label="Error match"
                      icon={<WarningIcon />}
                      color="red.500"
                    />
                  </Tooltip>
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Address </FormLabel>
            <Input
              type="text"
              variant="filled"
              mb={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Description </FormLabel>
            <Input
              type="text"
              variant="filled"
              mb={3}
              required
              value={organizationDescription}
              onChange={(e) => setOrganizationDescription(e.target.value)}
            />
          </FormControl>
          <Button bg={buttonColor} mb={8} onClick={handleSubmit}>
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
        {/* IMAGE */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          rounded={6}
          overflow="hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Register"
            className="object-cover"
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Register
