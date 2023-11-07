import { useContext, useState } from "react"
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
    Box
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { handleLogin } from "../../utils/auth"
import useAuth from "../../hooks/useAuth"

const Login = () => {
    const {setAuth} : any = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const { colorMode, toggleColorMode } = useColorMode()
    const formBackground = useColorModeValue("blue.100", "blue.700")
    const buttonColor = useColorModeValue("blue.400", "blue.300")
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            const res = await handleLogin(email, password)
            setAuth(res?.email, res?.roles, res?.accToken)
            if (res && res.status === "success") {
                navigate("/dashboard")
            } else {
                setErrMsg(res?.message || "Credentials not match")
            }
        } catch(err : any){
            console.log(err)
        }
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
                    alignItems="center"
                    justifyContent="center"
                >
                    <Heading mb={6}>Log In</Heading>
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
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
                        </FormLabel>
                    </FormControl>
                </Flex>

                {/* IMAGE */}
                <Box
                    display={{ base: "none", md: "block" }}
                    w="100%"
                    maxW="500px"
                    rounded={6}
                    overflow="hidden"
                >
                    <img
                        alt="login-prop"
                        src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                    />
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login
